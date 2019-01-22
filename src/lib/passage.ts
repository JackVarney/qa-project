import { Room } from "./room";

export class Passage {
  private static ids: number = 0;
  id: string;
  isExit: boolean;
  entrance: Room | null;
  exit: Room | null;

  constructor(id?: string, isExit?: boolean) {
    // if ID is passed use that
    // else assign id and then increment current id
    if (id) {
      this.id = id;
    } else {
      this.id = String(Passage.ids);
      Passage.ids += 1;
    }

    // if no isExit value or isExit is false, will default to false
    this.isExit = isExit || false;
    this.entrance = null;
    this.exit = null;
  }
}
