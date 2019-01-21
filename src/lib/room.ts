import { Item } from "./item";
import { Passage } from "./passage";

export interface Room {
  north: Passage | null;
  south: Passage | null;
  west: Passage | null;
  east: Passage | null;
  items: Item[];
}

export function createRoom(): Room {
  return {
    north: null,
    south: null,
    west: null,
    east: null,
    items: []
  };
}
