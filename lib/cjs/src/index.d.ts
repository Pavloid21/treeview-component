import React from 'react';
import { TreeNode, TreeViewProps } from 'types';
declare class TreeView extends React.Component<TreeViewProps> {
    tree: TreeNode;
    nodeView: any;
    state: {
        columns: any[];
        nodeReferencies: any[];
    };
    constructor(props: TreeViewProps);
    static createColumnsData: (tree: TreeNode) => {
        columns: any[][];
        nodeReferencies: {
            parent_node: string | undefined;
            node: any;
        }[][];
    };
    drawCurves: () => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    static getDerivedStateFromProps(props: {
        tree: any;
    }, state: any): any;
    render(): JSX.Element;
}
export default TreeView;
