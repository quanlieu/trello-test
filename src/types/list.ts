import { ICard } from "./card";

export interface IList {
  id: string;
  title: string;
  cards: ICard[];
}
