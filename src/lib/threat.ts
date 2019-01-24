import { Item } from "./item";
import { Action } from "./action";
import { generateRandomNumber } from "./utils";

const NAMES: string[] = ["Paul", "Geoff", "Frank", "Terry", "Arnold", "Samantha", "Lizzy", "Troll", "DRAGON!!", "Bear"];
const ACTIONS: string[] = ["Use Spoon", "Use Fork", "Use Spork", "Use Knife", "Use Cup", "Use Plate"];

export class Threat extends Item {
  action: Action;
  wrongAction: Action;

  constructor(name = NAMES[generateRandomNumber(0, NAMES.length - 1)]) {
    super(name);

    this.action = new Action(ACTIONS[generateRandomNumber(0, ACTIONS.length - 1)]);
    this.wrongAction = new Action(ACTIONS[generateRandomNumber(0, ACTIONS.length - 1)]);
  }

  clone(): Threat {
    const newThreat = new Threat(this.name);

    newThreat.action = this.action;
    newThreat.wrongAction = this.wrongAction;

    return newThreat;
  }
}
