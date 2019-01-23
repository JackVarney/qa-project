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

    // 50% chance of a room having a threat
    const hasThreat: boolean = Math.random() > 0.5;
    if (hasThreat) {
      items.push(new Threat());
    }

    // all rooms have treasure
    items.push(new Treasure());

    return items;
  }
}
