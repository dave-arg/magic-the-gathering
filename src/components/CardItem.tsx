import Card from "../model/Card";
import "./Carditem.css";

export function CardItem({
  card,
  className,
}: {
  card: Card;
  className: string;
}) {
  return (
    <div className={className}>
      <img src={card.image} alt={card.name} />
    </div>
  );
}
