"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface RefreshPageProps {
  text?: string;
  className?: string;
}

function RefreshPage({ text, className }: RefreshPageProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isPending}
      type="button"
      className={`hover:bg-stone-100 flex items-center justify-center gap-2 px-4 py-2 border border-stone-300 rounded-md ${className}`}
    >
      <Image
        className={isPending ? "animate-spin" : ""}
        src={isPending ? "/spinner.svg" : "/arrows.svg"}
        alt="Refresh"
        width={16}
        height={16}
      />
      <span>{text}</span>
    </button>
  );
}

export default RefreshPage;
