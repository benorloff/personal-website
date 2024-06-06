"use client";

import { cn } from "@/lib/utils";
import { SetStateAction, useEffect, useRef, useState } from "react";

function renderNodes(nodes: any) {
    return (
        <ul className="space-y-4">
            {nodes.map((node: any) => (
                node.depth <= 3 &&
                <li key={node.data.hProperties.id}>
                    <TOCLink node={node} />
                    {node.children.length > 0 && renderNodes(node.children)}
                </li>
            ))}
        </ul>
    )
}

function useHighlighted(id: string): [
  boolean,
  React.Dispatch<SetStateAction<string | null | undefined>>
] {
  const observer = useRef<IntersectionObserver>();
  const [activeId, setActiveId] = useState<string | undefined | null>();
 
  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };
 
    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "0% 0% -35% 0px",
    });
 
    const elements = document.querySelectorAll("h2, h3, h4");
    elements.forEach((elem) => observer.current?.observe(elem));
    return () => observer.current?.disconnect();
  }, []);
 
  return [activeId === id, setActiveId];
}


const TOCLink = ({ node }: { node: any }) => {
  const fontSizes: { [key: number]: string } = { 2: "base", 3: "sm", 4: "xs" };
  const id: string = node.data.hProperties.id;
  const [highlighted, setHighlighted] = useHighlighted(id)
  return (
    <a
      href={`#${id}`}
      className={cn(
        `text-${fontSizes[node.depth]} hover:underline transition-colors duration-300 ease-in-out`,
        highlighted && "text-accent"
      )}
      onClick={(e) => {
        e.preventDefault();
        setHighlighted(id);
        document
          .getElementById(id)!
          .scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      {node.value}
    </a>
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