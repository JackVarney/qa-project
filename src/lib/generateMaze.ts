import { Room } from "./room";
import { directions } from "./directions";
import { Passage } from "./passage";
import { isNull } from "util";
import { generateRandomNumber } from "./utils";

export function generateMaze(x = 2, y = 2) {
  var xLength = Array.from({ length: x });
  var yLength = Array.from({ length: y });

  class GridItem extends Room {
    toBeVisited: boolean;

    constructor(id: string) {
      super(id);

      this.toBeVisited = true;
    }
  }

  const grid = yLength.map((_, y) => yLength.map((_, x) => new GridItem(`${y}${x}`)));

  // starting at the top left
  var currentCell = [0, 0];
  var path = [currentCell];

  // flag the top left cell as visited and
  // store that we have visited one cell
  grid[0][0].toBeVisited = false;
  var visited = 1;

  const totalAmountOfCells: number = x * y;
  // if weve visited every cell the grid has been traversed
  while (visited < totalAmountOfCells) {
    let currentCellX: number = currentCell[0];
    let currentCellY: number = currentCell[1];

    // create an array of potential neighboring cells
    // and filter out any invalid neighbors
    const neighboringCells = [
      [currentCellX - 1, currentCellY, "north", "south"],
      [currentCellX, currentCellY + 1, "east", "west"],
      [currentCellX + 1, currentCellY, "south", "north"],
      [currentCellX, currentCellY - 1, "west", "east"]
    ].filter(cellInformation => {
      const potentialX = cellInformation[0] as number;
      const potentialY = cellInformation[1] as number;

      const potentialNeighborIsWithinGrid: boolean =
        potentialX > -1 && potentialX < y && potentialY > -1 && potentialY < x;

      return potentialNeighborIsWithinGrid && grid[potentialX][potentialY].toBeVisited;
    });

    if (neighboringCells.length > 0) {
      // get the values of a random valid neighboring cell
      const randomNeighbouringCell = neighboringCells[Math.floor(Math.random() * neighboringCells.length)];

      const neighboringCellX = randomNeighbouringCell[0] as number;
      const neighboringCellY = randomNeighbouringCell[1] as number;
      const currentCellWallPosition = randomNeighbouringCell[2] as keyof GridItem;
      const randomCellWallPostion = randomNeighbouringCell[3] as keyof GridItem;

      const passage = new Passage();
      passage.entrance = grid[currentCellX][currentCellY];
      passage.exit = grid[neighboringCellX][neighboringCellY];

      // remove the wall between the current cell and the random cell
      // and assign the passage to the cell wall
      grid[currentCellX][currentCellY][currentCellWallPosition] = passage;
      grid[neighboringCellX][neighboringCellY][randomCellWallPostion] = passage;

      // flag the cell as visited
      grid[neighboringCellX][neighboringCellY].toBeVisited = false;
      // update the current cell to be the neighboring cell
      currentCell = [neighboringCellX, neighboringCellY];

      visited += 1;
      // add the current cell the the stack
      // so that we can traverse back to it
      path.push(currentCell);
    } else {
      // if there are no valid neighboring cells
      // remove the current cell from the stack and revert to the previous cell
      currentCell = path.pop()!;
    }
  }

  const rooms: Room[] = grid.reduce(
    (acc, cur) => {
      return [...acc, ...cur];
    },
    [] as Room[]
  );

  return setExit(rooms);
}

function setExit(rooms: Room[]): Room[] {
  const indexOfFirstDeadEnd: number = generateRandomNumber(0, rooms.length - 1);

  directions.every(key => {
    const passage = rooms[indexOfFirstDeadEnd][key] as Passage;

    if (passage !== null) {
      passage.isExit = true;
      return false;
    }

    return true;
  });

  return rooms;
}
