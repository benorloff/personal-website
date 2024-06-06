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
        className="h-fit py-[2px] text-muted-foreground  border border-muted-foreground/50 hover:text-foreground hover:bg-background !disabled:bg-background transition-colors duration-300 ease-in-out"
    >
        {isCopied ? 'Copied!' : 'Copy'}
    </Button>
  );
};