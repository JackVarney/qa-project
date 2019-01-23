import React, { Component } from "react";
import { SavedMaze, Walls, SavedPassage, SavedRoom } from "../types/savedMaze";
import { Room } from "../lib/room";
import { Passage } from "../lib/passage";
import { directions } from "../lib/directions";
import "./LoadButton.css";
import { Treasure } from "../lib/treasure";
import { Threat } from "../lib/threat";

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
        const loadedMaze: SavedMaze = JSON.parse(e.target.result);

        const maze: Room[] = this.restoreMaze(loadedMaze);

        this.props.onLoad(maze);
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
          const d = direction as keyof Walls;

          if (loadedRoom[d] !== null) {
            const { savedPassage, passage } = passages.reduce(
              (acc, cur) => {
                if (cur.passage.id === loadedRoom[d]) {
                  acc = cur;
                }

                return acc;
              },
              {} as Passages
            );

            room[d] = passage;
          }
        });

        return room;
      }
    );
  }

  assignLoadedRoomsToPassages(rooms: Room[], passages: Passages[]) {
    rooms.forEach(room => {
      directions.forEach(key => {
        const d = key as keyof Walls;

        if (room[d]) {
          const passage = room[d] as Passage;

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
        if (item.name === "Gold") {
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
}
