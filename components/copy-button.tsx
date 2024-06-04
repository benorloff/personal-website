"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Check, Clipboard } from "lucide-react";

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };

  return (
    <Button 
        size="sm"
        variant="ghost"
        disabled={isCopied} 
        onClick={copy}
        className="hidden md:absolute h-fit md:flex items-center top-4 right-4 py-[2px] text-muted-foreground border border-muted-foreground/50 hover:text-muted-foreground hover:bg-transparent transition-colors duration-300 ease-in-out"
    >
        {isCopied ? 'Copied!' : 'Copy'}
    </Button>
  );
};