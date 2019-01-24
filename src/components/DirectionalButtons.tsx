import React, { Component } from "react";
import { Room } from "../lib/room";
import { Passage } from "../lib/passage";
import DirectionalButton from "./DirectionalButton";
import { Threat } from "../lib/threat";

interface Props {
  room: Room;
  setRoom: (room: Room) => void;
  onGameComplete: () => void;
}

interface ButtonConfig {
  key: keyof Room;
  text: string;
}

const buttonConfig: ButtonConfig[] = [
  { key: "north", text: "North" },
  { key: "east", text: "East" },
  { key: "south", text: "South" },
  { key: "west", text: "West" }
];

export default class DirectionalButtons extends Component<Props> {
  render() {
    const { room } = this.props;

    return buttonConfig.map(({ key, text }) => (
      <DirectionalButton key={key} onClick={this.createOnClick(key)} disabled={this.isDisabled(key)}>
        {text}
      </DirectionalButton>
    ));
  }

  createOnClick = (key: keyof Room) => () => {
    const { onGameComplete } = this.props;
    const hasThreat: boolean = this.hasThreat();

    if (hasThreat) {
      alert("cannot move until threat dealt with");
    } else {
      const { room, setRoom } = this.props;

      const isValidDirection: boolean = this.isValidDirection(room[key] as Passage | null);

      if (isValidDirection) {
        const passage = room[key] as Passage;

        if (passage.isExit) {
          onGameComplete();
        } else {
          setRoom(this.getRoomFromPassage(passage, room.id));
        }
      } else {
        alert("You may not go that way");
      }
    }
  };

  getRoomFromPassage(passage: Passage, id: string): Room {
    const entranceIsDifferentRoom = passage.entrance!.id !== id;

    console.log(passage);

    if (entranceIsDifferentRoom) {
      return passage.entrance! as Room;
    } else {
      return passage.exit! as Room;
    }
  }

  isDisabled(key: keyof Room): boolean {
    const { room } = this.props;

    if (this.hasThreat()) {
      return true;
    }

    return room[key] === null;
  }

  isValidDirection(direction: Passage | null) {
    return direction !== null;
  }

  hasThreat(): boolean {
    const { room } = this.props;

    return room.items.reduce((hasThreat, item) => {
      if (item instanceof Threat) {
        hasThreat = true;
      }

      return hasThreat;
    }, false);
  }
}
