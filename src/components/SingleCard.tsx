import { SingleCardProps } from "../types/single-card-props";
import "./SingleCard.css";

const SingleCard = ({
  card,
  handleChoice,
  flipped,
  disabled,
}: SingleCardProps) => {
  const handleClick = () => !disabled && handleChoice(card);

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img
          className="front"
          src={`${card.name}.png`}
          alt="Mushroom card front"
        />
        <img
          className="back"
          src="./pattern_grzybobranie.png"
          onClick={handleClick}
          alt="Mushroom card back"
        />
      </div>
    </div>
  );
};

export default SingleCard;
