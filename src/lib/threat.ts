import { Item } from "./item";
import { Action } from "./action";

export class Threat extends Item {
  action: Action;

  constructor() {
    super("Im a threat yo!");

    this.action = new Action("kill");
  }
}
