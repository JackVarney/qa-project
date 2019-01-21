import { createItem, Item } from "./item";
import { generateRandomNumber } from "./utils";

export interface Treasure extends Item {
  value: number;
}

export function createTreasure(): Treasure {
  const item = createItem("Gold");

  return {
    ...item,
    value: generateRandomNumber(10, 1000)
  };
}
