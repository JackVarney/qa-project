import { Item } from "./item";
import { Passage } from "./passage";

export interface Room {
  id: number;
  north: Passage | null;
  south: Passage | null;
  west: Passage | null;
  east: Passage | null;
  items: Item[];
}

export function createRoom(id: number): Room {
  return {
    id,
    north: null,
    south: null,
    west: null,
    east: null,
    items: []
  };
}
