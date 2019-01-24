import { Room } from "./room";
import { generateMaze } from "./generateMaze";
import { directions } from "./directions";
import { Passage } from "./passage";
import { Item } from "./item";
import { SavedMaze, SavedRoom, Walls } from "../types/savedMaze";

interface StoredPassage {
  isExit: boolean;
  entrance: string;
  exit: string;
  id: string;
}

export function saveMaze(rooms: Room[]) {
  rooms = generateMaze();

  const passageSet: StoredPassage[] = rooms
    .map(
      room => {
        const roomPassages = directions.reduce(
          (d, key) => {
            const p = room[key] as Passage | null;

            if (p === null) {
              return d;
            } else {
              return [
                ...d,
                {
                  id: p.id,
                  isExit: p.isExit,
                  entrance: p.entrance!.id,
                  exit: p.exit!.id
                }
              ];
            }
          },
          [] as StoredPassage[]
        );

        return [...roomPassages];
      },
      [] as StoredPassage[]
    )
    .reduce((acc, cur) => [...acc, ...cur], [] as StoredPassage[])
    .reduce(
      (acc, cur) => {
        const alreadyExistsInAccumulator = acc.reduce((alreadyExists, c) => {
          const entranceExists = c.exit === cur.exit;
          const exitExists = c.entrance === cur.entrance;

          if (!alreadyExists && entranceExists && exitExists) {
            alreadyExists = true;
          }

          return alreadyExists;
        }, false);

        if (!alreadyExistsInAccumulator) {
          acc.push(cur);
        }

        return acc;
      },
      [] as StoredPassage[]
    );

  const roomSet: SavedRoom[] = rooms.map(room => {
    const newWalls: Walls = directions.reduce<Walls>(
      (acc, key) => {
        if (room[key] instanceof Passage) {
          const passage = room[key] as Passage;

          acc[key] = passage.id;
        }

        return acc;
      },
      {
        north: null,
        east: null,
        west: null,
        south: null
      }
    );

    return {
      id: room.id,
      items: room.items,
      ...newWalls
    };
  });

  const maze: SavedMaze = {
    maze: {
      rooms: roomSet,
      passages: passageSet
    }
  };

  const file = new Blob([JSON.stringify(maze, null, 2)]);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = "maze-config.json";
  a.click();
}
