import { Item } from "./item";
import { generateRandomNumber } from "./utils";

export class Treasure extends Item {
  value: number;

  constructor() {
    super("Gold");

    this.value = generateRandomNumber(10, 1000);
  }
}
