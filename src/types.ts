import React from "react";

export type TreeViewProps = {
  [x: string]: any;
  nodeView: typeof React.Component;
  emptyNode: typeof React.Component;
  nodeViewClasses: any;
  emptyNodeProps: any;
  showEmptyNodes: boolean;
  tree: TreeNode;
};

export type TreeNode = {
  node: string;
  parent_node: string | null;
  title?: string;
  description?: string;
  children: (TreeNode | null)[];
};
