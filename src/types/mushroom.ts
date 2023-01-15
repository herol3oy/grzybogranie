import { MushroomType } from "./mushroom-type";

export interface Mushroom {
  id?: number;
  name: string;
  type?: MushroomType;
  matched: boolean;
}
