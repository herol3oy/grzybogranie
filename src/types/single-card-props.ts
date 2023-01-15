import { Mushroom } from "./mushroom";

export interface SingleCardProps {
  card: Mushroom;
  handleChoice: (card: Mushroom) => void;
  flipped: boolean;
  disabled: boolean;
}
