import { Card } from "./card.interface";

export interface Deck {
  id: string;
  cards: Array<Card>;
  name: string;
}
