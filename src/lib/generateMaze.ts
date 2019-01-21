import { createRoom, Room } from "./room";
import { directions } from "./directions";
import { createPassage, Passage } from "./passage";
import { isNull } from "util";
import { generateRandomNumber } from "./utils";

function getRandomRoom(
  rooms: Room[]
): {
  room: Room;
  validDirections: Array<keyof Room>;
} {
  const index: number = generateRandomNumber(0, rooms.length - 1);
  const room: Room = rooms[index];

  const validDirections = directions.reduce(
    (acc, direction) => {
      const hasNoPassage: boolean = room[direction] === null;

      if (hasNoPassage) {
        acc.push(direction);
      }

      return acc;
    },
    [] as Array<keyof Room>
  );

  return validDirections.length === 0
    ? getRandomRoom(rooms)
    : {
        room,
        validDirections
      };
}

function assignRoomPassage(passage: Passage, rooms: Room[]) {
  const { room, validDirections } = getRandomRoom(rooms);
  const direction = validDirections[generateRandomNumber(0, validDirections.length - 1)];
  room[direction] = passage;
  return room;
}

export function generateMaze(roomCount: number = 7): Room[] {
  // create rooms with correct length
  const rooms = Array.from({ length: roomCount }, (_, i) => createRoom(i));

  for (let i = 0; i < 10; i += 1) {
    const passage = createPassage();

    const room1 = assignRoomPassage(passage, rooms);
    passage.entrance = room1;

    const room2 = assignRoomPassage(passage, rooms);
    passage.exit = room2;
  }

  const roomsWithPassages: Room[] = rooms.filter(
    ({ east, west, south, north }) => east !== null || west !== null || south !== null || north !== null
  );

  const { room } = getRandomRoom(roomsWithPassages);
  directions.every(key => {
    let shouldContinue = true;

    if (room[key] !== null) {
      const exitPassage = room[key] as Passage;
      exitPassage.isExit = true;
      shouldContinue = false;
    }

    return shouldContinue;
  });

  return roomsWithPassages;
}
