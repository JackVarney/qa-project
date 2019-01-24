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

  cloneRoom(): Room {
    const newRoom = new Room(this.id);

    newRoom.east = this.east;
    this.setPassage(newRoom.east, newRoom);

    newRoom.south = this.south;
    this.setPassage(newRoom.south, newRoom);

    newRoom.west = this.west;
    this.setPassage(newRoom.west, newRoom);

    newRoom.north = this.north;
    this.setPassage(newRoom.north, newRoom);

    newRoom.items = this.cloneItems();

    return newRoom;
  }

  private cloneItems(): Item[] {
    return this.items.map(item => item.clone());
  }

  private setPassage = (passage: Passage | null, newRoom: Room) => {
    if (passage instanceof Passage) {
      if (passage.entrance!.id === newRoom.id) {
        passage.entrance = newRoom;
      } else {
        passage.exit = newRoom;
      }
    }
  };

  static cloneRooms(rooms: Room[]): Room[] {
    return rooms.map(room => {
      return room.cloneRoom();
    });
  }
}
