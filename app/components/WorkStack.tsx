import type { ReactNode } from "react";

export function WorkStack({ cards }: { cards: ReactNode[] }) {
  return (
    <div className="work-stack">
      {cards.map((card, i) => (
        <div key={i} className="work-stack-card">
          {card}
        </div>
      ))}
    </div>
  );
}
