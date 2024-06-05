"use client";

function renderNodes(nodes: any) {
    return (
        <ul className="space-y-4">
            {nodes.map((node: any) => (
                node.depth <= 3 &&
                <li key={node.data.hProperties.id}>
                    <a href={`#${node.data.hProperties.id}`}>{node.value}</a>
                    {node.children.length > 0 && renderNodes(node.children)}
                </li>
            ))}
        </ul>
    )
}

export const TableOfContents = ({ nodes }: { nodes: any}) => {
    if (!nodes?.length) {
      return null;
    }
   
    return (
      <div className="toc text-sm">
        {renderNodes(nodes)}
      </div>
    );
  };