import React, { Component } from "react";
import { SavedMaze, Walls } from "../types/savedMaze";
import { Room } from "../lib/room";
import { Passage } from "../lib/passage";
import { directions } from "../lib/directions";
import "./LoadButton.css";

export default class LoadButton extends Component {
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

        console.log(maze);
      };

      reader.readAsText(file);
    }
  };

  restoreMaze(loadedMaze: SavedMaze): Room[] {
    const m = loadedMaze.maze;
    const { passages: loadedPassages, rooms } = m;

    const passages = loadedPassages.map(({ id, isExit }): Passage => new Passage(id, isExit));

    return rooms.map(
      (loadedRoom): Room => {
        const room = new Room(loadedRoom.id);
        room.items = loadedRoom.items;

        directions.forEach(direction => {
          const d = direction as keyof Walls;

          if (loadedRoom[d] !== null) {
            const passage = passages.reduce<Passage>(
              (acc, cur) => {
                if (cur.id === loadedRoom[d]) {
                  acc = cur;
                }

                return acc;
              },
              {} as Passage
            );

            room[d] = passage;
          }
        });

        return room;
      }
    );
  }
}
