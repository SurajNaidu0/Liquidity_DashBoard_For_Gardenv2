import type { ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
}

function Card({ className, children }: CardProps) {
  return (
    <section
      className={`flex flex-col gap-4 rounded-xl border border-stone-200 shadow p-6 min-h-64 ${className}`}
    >
      {children}
    </section>
  );
}

export default Card;
