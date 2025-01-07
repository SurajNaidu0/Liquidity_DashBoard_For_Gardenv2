import type { ReactNode } from "react";

function Card({ children }: { children: ReactNode }) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border shadow p-6">
      {children}
    </article>
  );
}

export default Card;
