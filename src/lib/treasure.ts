import { Item } from "./item";
import { generateRandomNumber } from "./utils";

export class Treasure extends Item {
  value: number;

  constructor(name = "Gold", value = generateRandomNumber(10, 1000)) {
    super(name);
    this.value = value;
  }

  clone(): Treasure {
    return new Treasure(this.name, this.value);
  }
}
