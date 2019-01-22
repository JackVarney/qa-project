import { Item } from "./item";
import { Passage } from "./passage";
import { Treasure } from "./treasure";
import { Threat } from "./threat";

export class Room {
  id: string;
  north: Passage | null;
  south: Passage | null;
  west: Passage | null;
  east: Passage | null;
  items: Item[];

  constructor(id: string) {
    this.id = id;
    this.north = null;
    this.south = null;
    this.west = null;
    this.east = null;
    this.items = this.generateItems();
  }

  private generateItems(): Item[] {
    const items = [];

    items.push(new Treasure());

    const hasThreat: boolean = Math.random() > 0.5;
    if (hasThreat) {
      items.push(new Threat());
    }

    return items;
  }

  cloneRoom(): Room {
    const newRoom = new Room(this.id);

    // passages wont ever change so we can keep the same object reference
    newRoom.north = this.north;
    newRoom.east = this.east;
    newRoom.west = this.west;
    newRoom.south = this.south;

    newRoom.items = [...this.items];

    return newRoom;
  }
}
