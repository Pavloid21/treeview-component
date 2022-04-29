"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var styles_module_css_1 = __importDefault(require("./styles.module.css"));
var react_easy_panzoom_1 = require("react-easy-panzoom");
var _ = __importStar(require("lodash"));
var TreeView = /** @class */ (function (_super) {
    __extends(TreeView, _super);
    function TreeView(props) {
        var _this = _super.call(this, props) || this;
        _this.drawCurves = function () {
            document.querySelectorAll("div[class*=\"".concat(styles_module_css_1.default.svg_container, "\"]")).forEach(function (e) { return e.remove(); });
            var pipelineContainer = document.getElementById('tree_wrapper');
            var nodeReferencies = _this.state.nodeReferencies;
            _this.state.columns.forEach(function (column, id) {
                column.forEach(function (cell, index) {
                    if (id !== _this.state.columns.length - 1) {
                        var cardElement = react_dom_1.default.findDOMNode(nodeReferencies[id][index].element);
                        var childrenElements_1 = [];
                        _this.state.columns[id + 1].map(function (child, c) {
                            if (child && child.parent_node === cell.node) {
                                childrenElements_1.push(nodeReferencies[id + 1][c].element);
                            }
                        });
                        var coords_1 = [];
                        if (childrenElements_1.length) {
                            childrenElements_1.forEach(function (ce) {
                                if (ce) {
                                    var domNode = react_dom_1.default.findDOMNode(ce);
                                    if (domNode)
                                        coords_1.push({
                                            x: domNode.offsetLeft,
                                            y: domNode.offsetTop + domNode.offsetHeight / 2,
                                        });
                                }
                            });
                            if (cardElement) {
                                var x = cardElement.offsetWidth + cardElement.offsetLeft;
                                var center = cardElement.offsetTop + cardElement.offsetHeight / 2;
                                if (x !== 0 && !cardElement.classList.contains('add_card')) {
                                    // draw dots and path
                                    var svgContainer = document.createElement('div');
                                    svgContainer.setAttribute('class', styles_module_css_1.default.svg_container);
                                    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                                    var checkPoints_1 = coords_1.map(function (coord) { return coord.y; }).concat(center);
                                    var height = _.max(checkPoints_1) - _.min(checkPoints_1) >= 12 ? _.max(checkPoints_1) - _.min(checkPoints_1) : 12;
                                    circle.setAttribute('width', '160');
                                    circle.setAttribute('height', height.toString());
                                    circle.setAttribute('viewBox', "0 0 160 ".concat(height));
                                    circle.setAttribute('version', '1.1');
                                    circle.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                                    var sourcePositionY_1 = 0;
                                    if (Math.abs(_.min(checkPoints_1) - center) === height) {
                                        sourcePositionY_1 = height - 6;
                                    }
                                    else if (Math.abs(_.min(checkPoints_1) - center) < 6) {
                                        sourcePositionY_1 = 6;
                                    }
                                    else {
                                        sourcePositionY_1 = Math.abs(_.min(checkPoints_1) - center);
                                    }
                                    var lines = coords_1.map(function (coord) {
                                        var besie = "<path d=\"M 6, ".concat(sourcePositionY_1, " C 80, ").concat(sourcePositionY_1, ", 80, ").concat(Math.abs(coord.y - _.min(checkPoints_1)), ", 160, ").concat(Math.abs(coord.y - _.min(checkPoints_1)), "\" stroke=\"#C4C4C4\" fill=\"none\"/>");
                                        return besie;
                                    });
                                    circle.innerHTML = "\n                  ".concat(lines.join('\n'), "\n                  ").concat(lines.length ? "<circle cx=\"6\" cy=".concat(sourcePositionY_1, " r=\"4\" fill=\"#C4C4C4\"/>") : null, "\n                ");
                                    svgContainer.style.top = _.min(checkPoints_1) + 'px';
                                    svgContainer.style.left = x + 'px';
                                    svgContainer.appendChild(circle);
                                    pipelineContainer.appendChild(svgContainer);
                                }
                            }
                        }
                    }
                });
            });
        };
        _this.tree = __assign({}, props.tree);
        _this.nodeView = props.nodeView;
        _this.state = __assign({}, TreeView.createColumnsData(_this.tree));
        return _this;
    }
    TreeView.prototype.componentDidMount = function () {
        this.drawCurves();
    };
    TreeView.prototype.componentDidUpdate = function () {
        this.drawCurves();
    };
    TreeView.getDerivedStateFromProps = function (props, state) {
        return __assign(__assign({}, state), TreeView.createColumnsData(props.tree));
    };
    TreeView.prototype.render = function () {
        var _this = this;
        var _a = this.props, nodeView = _a.nodeView, emptyNode = _a.emptyNode, nodeViewClasses = _a.nodeViewClasses, emptyNodeProps = _a.emptyNodeProps, showEmptyNodes = _a.showEmptyNodes, props = __rest(_a, ["nodeView", "emptyNode", "nodeViewClasses", "emptyNodeProps", "showEmptyNodes"]);
        var _b = this.state, nodeReferencies = _b.nodeReferencies, columns = _b.columns;
        var NodeView = nodeView;
        var EmptyNode = emptyNode;
        return ((0, jsx_runtime_1.jsx)(react_easy_panzoom_1.PanZoom, __assign({}, props, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: styles_module_css_1.default.tree, id: "tree_wrapper" }, { children: columns.map(function (col, i) {
                    return col.length ? ((0, jsx_runtime_1.jsx)("div", __assign({ style: { display: 'flex' } }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: styles_module_css_1.default.tree__column }, { children: col.map(function (item, idx) {
                                return Object.keys(item).length > 3 ? ((0, jsx_runtime_1.jsx)(NodeView, __assign({ ref: function (el) { return (nodeReferencies[i][idx].element = el); }, id: "card_".concat(i).concat(idx) }, item, { styles: nodeViewClasses }), "node_".concat(i).concat(idx))) : showEmptyNodes ? ((0, jsx_runtime_1.jsx)(EmptyNode, __assign({ ref: function (el) { return (nodeReferencies[i][idx].element = el); }, styles: nodeViewClasses, data: __assign(__assign({}, nodeReferencies[i][idx]), { newTree: _this.tree }) }, emptyNodeProps), "node_".concat(i).concat(idx))) : null;
                            }) })) }), "id_".concat(i))) : null;
                }) })) })));
    };
    TreeView.createColumnsData = function (tree) {
        var columns = [];
        var nodeReferencies = [];
        var newTree = __assign({}, tree);
        var treeWalker = function (treeNode, column, parent) {
            if (column === void 0) { column = 0; }
            if (!columns[column]) {
                columns.push([]);
                nodeReferencies.push([]);
            }
            if (!columns[column + 1]) {
                columns.push([]);
                nodeReferencies.push([]);
            }
            if (treeNode) {
                treeNode.parent_node = parent ? parent.node : null;
                treeNode.node = "".concat(column).concat(columns[column].length);
            }
            columns[column].push(treeNode);
            nodeReferencies[column].push({
                parent_node: parent ? parent.node : undefined,
                node: treeNode,
            });
            if (treeNode && treeNode.children) {
                treeNode.children.forEach(function (child, id) {
                    if (child === null) {
                        treeNode.children[id] = {
                            children: [],
                            parent_node: treeNode.node,
                            node: "".concat(column).concat(columns[column].length),
                        };
                    }
                    treeWalker(treeNode.children[id], column + 1, treeNode);
                });
            }
        };
        treeWalker(newTree);
        return {
            columns: columns,
            nodeReferencies: nodeReferencies,
        };
    };
    return TreeView;
}(react_1.default.Component));
exports.default = TreeView;
