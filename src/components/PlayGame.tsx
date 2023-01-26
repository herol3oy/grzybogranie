import { useEffect, useState } from "preact/hooks";
import { MUSHROOMS } from "../core/mushrooms";
import { Mushroom } from "../types/mushroom";
import SingleCard from "./SingleCard";
import "./PlayGame.css";

export function PlayGame() {
  const [cards, setCards] = useState<Mushroom[]>([]);
  const [choiceOne, setChoiceOne] = useState<Mushroom | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Mushroom | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.name === choiceTwo.name) {
        setCards((prevCards: Mushroom[]) => {
          return prevCards.map((card: Mushroom) => {
            if (card.name === choiceOne.name) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => shuffleCards(), []);

  const shuffleCards = () => {
    const shuffleCards = [...MUSHROOMS.slice(0, 8), ...MUSHROOMS.slice(0, 8)]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffleCards);
  };

  const handleChoice = (card: Mushroom) =>
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };
  return (
    <div className='container'>
      {cards.length && !cards.find((c) => !c.matched)
        ? alert("heeeeyyyy!")
        : null}

      <button onClick={() => shuffleCards()}>New Game</button>

      <div className="card-grid">
        {cards.map((card: Mushroom) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
