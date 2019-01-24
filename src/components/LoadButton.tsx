import React, { Component } from "react";
import { SavedMaze, Walls, SavedPassage, SavedRoom } from "../types/savedMaze";
import { Room } from "../lib/room";
import { Passage } from "../lib/passage";
import { directions } from "../lib/directions";
import "./LoadButton.css";
import { Treasure } from "../lib/treasure";
import { Threat } from "../lib/threat";
import Validator from "validatorjs";

type Passages = {
  savedPassage: SavedPassage;
  passage: Passage;
};

interface Props {
  onLoad: (rooms: Room[]) => void;
}

export default class LoadButton extends Component<Props> {
  render() {
    return (
      <>
        <label className="LoadButton__label" htmlFor="load-config">
          Load Config
        </label>
        <input className="LoadButton__input" id="load-config" type="file" onChange={this.onLoadConfig} />
      </>
    );
  }

  onLoadConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = [...e.target.files][0];

      const reader = new FileReader();

      reader.onload = e => {
        // typescript doesnt recognize e.target.result
        // @ts-ignore
        const loadedMaze: SavedMaze | undefined = this.validateUpload(e.target.result);

        if (loadedMaze !== undefined) {
          const maze: Room[] = this.restoreMaze(loadedMaze);

          this.props.onLoad(maze);
        }
      };

      reader.readAsText(file);
    }
  };

  restoreMaze(loadedMaze: SavedMaze): Room[] {
    const m = loadedMaze.maze;
    const { passages: loadedPassages, rooms } = m;

    // create passages from saved passages
    const passages: Passages[] = loadedPassages.map(savedPassage => ({
      passage: new Passage(savedPassage.id, savedPassage.isExit),
      savedPassage
    }));

    const newRooms = this.loadRoomsFromSavedRooms(rooms, passages);
    this.assignLoadedRoomsToPassages(newRooms, passages);
    return this.instanciateItems(newRooms);
  }

  loadRoomsFromSavedRooms(rooms: SavedRoom[], passages: Passages[]) {
    return rooms.map(
      (loadedRoom): Room => {
        const room = new Room(loadedRoom.id);
        room.items = loadedRoom.items;

        directions.forEach(direction => {
          if (loadedRoom[direction] !== null) {
            const { savedPassage, passage } = passages.reduce(
              (acc, cur) => {
                if (cur.passage.id === loadedRoom[direction]) {
                  acc = cur;
                }

                return acc;
              },
              {} as Passages
            );

            room[direction] = passage;
          }
        });

        return room;
      }
    );
  }

  assignLoadedRoomsToPassages(rooms: Room[], passages: Passages[]) {
    rooms.forEach(room => {
      directions.forEach(key => {
        if (room[key]) {
          const passage = room[key] as Passage;

          passages.forEach(({ savedPassage }) => {
            if (savedPassage.id === passage.id) {
              passage.entrance = this.getRoomFromId(rooms, savedPassage.entrance);
              passage.exit = this.getRoomFromId(rooms, savedPassage.exit);
            }
          });
        }
      });
    });
  }

  instanciateItems(rooms: Room[]): Room[] {
    return rooms.map(room => {
      room.items = room.items.map(item => {
        if (item.name === "Gold" || item.name === "Coin") {
          const ogTreasure = item as Treasure;
          const t = new Treasure();
          t.value = ogTreasure.value;
          return t;
        } else {
          const ogThreat = item as Threat;
          const t = new Threat();
          t.action = ogThreat.action;
          t.wrongAction = ogThreat.wrongAction;
          return t;
        }
      });

      return room;
    });
  }

  getRoomFromId(rooms: Room[], id: string): Room {
    return rooms.reduce((acc, room) => {
      if (room.id === id) {
        acc = room;
      }

      return acc;
    });
  }

  validateUpload(upload: any): SavedMaze | void {
    try {
      const savedMaze: SavedMaze = JSON.parse(upload);

      if (
        new Validator(savedMaze, {
          maze: {
            rooms: ["array", "required"],
            passages: ["array", "required"]
          }
        }).check()
      ) {
        const arePassagesValid: boolean = savedMaze.maze.passages.reduce((isValid, passage) => {
          if (!isValid) return false;

          return new Validator(passage, {
            id: ["string", "required"],
            isExit: ["boolean", "required"],
            entrance: ["string", "required"],
            exit: ["string", "required"]
          }).check();
        }, true);

        if (arePassagesValid) {
          const areRoomsValid: boolean = savedMaze.maze.rooms.reduce((isValid, room) => {
            if (!isValid) return false;

            return new Validator(room, {
              id: ["string", "required"],
              items: ["array"]
            }).check();
          }, true);

          if (!areRoomsValid) {
            this.saveErrorFile("File is JSON, but rooms are of invalid structure");
          }
        } else {
          this.saveErrorFile("File is JSON, but passages are of invalid structure");
        }
      } else {
        this.saveErrorFile("File is JSON, but has invalid structure");
      }

      return savedMaze;
    } catch (e) {
      this.saveErrorFile("Unable to parse file. Check file is JSON.");
    }
  }

  saveErrorFile(error: string) {
    const file = new Blob([error]);
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "maze-error.txt";
    a.click();
  }
}
