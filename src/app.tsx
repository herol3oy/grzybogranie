import { useEffect, useState } from "preact/hooks";
import { MUSHROOMS } from "./core/mushrooms";
import { Mushroom } from "./types/mushroom";
import SingleCard from "./components/SingleCard";
import "./app.css";

export function App() {
  const [cards, setCards] = useState<Mushroom[]>([]);
  const [turns, setTurns] = useState<number>(0);
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
    const shuffleCards = [...MUSHROOMS, ...MUSHROOMS]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffleCards);
    setTurns(0);
  };

  const handleChoice = (card: Mushroom) =>
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn: number): number => prevTurn + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      {cards.length && !cards.find((c) => !c.matched)
        ? alert("heeeeyyyy!")
        : null}

      <h1>Grazybogranie</h1>
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
      <p>Turns: {turns}</p>
    </div>
  );
}
