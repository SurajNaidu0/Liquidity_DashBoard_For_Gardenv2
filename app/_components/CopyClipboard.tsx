"use client";

import Image from "next/image";
import { useState } from "react";

interface CopyClipboardProps {
  text: string;
  className?: string;
  children: React.ReactNode;
}

function CopyClipboard({ text, className, children }: CopyClipboardProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsChecked(true);
    setTimeout(() => setIsChecked(false), 1000);
  };

  return (
    <button className={className} onClick={handleCopy} type="button">
      {isChecked ? (
        <Image src="/check.svg" alt="Copied!" height={20} width={20} />
      ) : (
        children
      )}
    </button>
  );
}

export default CopyClipboard;
