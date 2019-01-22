import React, { Component } from "react";
import { Room } from "../lib/room";
import { Passage } from "../lib/passage";
import DirectionalButton from "./DirectionalButton";

interface Props {
  room: Room;
  setRoom: (room: Room) => void;
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
    const { room, setRoom } = this.props;

    console.log(room);

    return (
      <>
        {buttonConfig.map(({ key, text }) => (
          <DirectionalButton
            key={key}
            onClick={() => {
              const isValidDirection = this.isValidDirection(room[key] as Passage | null);

              if (isValidDirection) {
                const passage = room[key] as Passage;

                if (passage.isExit) {
                } else {
                  const entranceIsDifferentRoom = passage.entrance!.id !== room.id;
                  const exitIsDifferentRoom = passage.exit!.id !== room.id;

                  if (entranceIsDifferentRoom) {
                    setRoom(passage.entrance!);
                  } else if (exitIsDifferentRoom) {
                    setRoom(passage.exit!);
                  }
                }
              } else {
                alert("You may not go that way");
              }
            }}
          >
            {text}
          </DirectionalButton>
        ))}
      </>
    );
  }

  isValidDirection(direction: Passage | null) {
    return direction !== null;
  }
}
