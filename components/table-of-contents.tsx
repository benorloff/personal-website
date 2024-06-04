"use client";

function renderNodes(nodes) {
    return (
        <ul>
            {nodes.map((node) => (
                <li key={node.data.hProperties.id}>
                    <a href={`#${node.data.hProperties.id}`}>{node.value}</a>
                    {node.children.length > 0 && renderNodes(node.children)}
                </li>
            ))}
        </ul>
    )
}

export const TableOfContents = ({ nodes }) => {
    if (!nodes?.length) {
      return null;
    }
   
    return (
      <div className={"toc"}>
        {renderNodes(nodes)}
      </div>
    );
  };