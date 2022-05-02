import React from 'react';
import { TreeNode, TreeViewProps } from 'types';
declare class TreeView extends React.Component<TreeViewProps> {
    tree: TreeNode;
    nodeView: typeof React.Component;
    state: {
        columns: (TreeNode | null)[][];
        nodeReferencies: any[];
    };
    constructor(props: TreeViewProps);
    static createColumnsData: (tree: TreeNode) => {
        columns: (TreeNode | null)[][];
        nodeReferencies: {
            parent_node: string | undefined;
            node: TreeNode | null;
        }[][];
    };
    drawCurves: () => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    static getDerivedStateFromProps(props: {
        tree: TreeNode;
    }, state: {
        columns: (TreeNode | null)[][];
        nodeReferencies: any[];
    }): {
        columns: (TreeNode | null)[][];
        nodeReferencies: {
            parent_node: string | undefined;
            node: TreeNode | null;
        }[][];
    };
    render(): JSX.Element;
}
export default TreeView;
