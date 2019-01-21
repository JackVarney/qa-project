import { Room } from "./room";

export interface Passage {
  isExit: boolean;
  entrance: Room | null;
  exit: Room | null;
}

export function createPassage(): Passage {
  return {
    isExit: false,
    entrance: null,
    exit: null
  };
}
