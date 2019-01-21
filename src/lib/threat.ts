import { Item, createItem } from "./item";
import { Action, createAction } from "./Action";

export interface Threat extends Item {
  action: Action;
}

export function createThreat() {
  const item = createItem("IM A THREAT YO");
  const action = createAction("kill");

  return {
    ...item,
    action
  };
}
