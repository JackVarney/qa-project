import { Item } from "../lib/item";

export interface SavedMaze {
  maze: {
    rooms: SavedRoom[];
    passages: Array<{
      id: string;
      isExit: boolean;
      entrance: string;
      exit: string;
    }>;
  };
}

export interface Walls {
  north: string | null;
  east: string | null;
  south: string | null;
  west: string | null;
}

export interface SavedRoom extends Walls {
  id: string;
  items: Item[];
}
