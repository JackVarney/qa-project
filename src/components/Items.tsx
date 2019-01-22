import React, { Component } from "react";
import { Item } from "../lib/item";
import { Threat } from "../lib/threat";
import { Treasure } from "../lib/treasure";
import { Room } from "../lib/room";
import TreasureDisplay from "./TreasureDisplay";

interface Props {
  setRoom: (room: Room) => void;
  room: Room;
  alterPlayerGold: (gold: number) => void;
}

export default class Items extends Component<Props> {
  render() {
    const { setRoom, room, alterPlayerGold } = this.props;
    let foundGold: boolean = false;

    const itemsToRender = room.items.map((item, i) => {
      if (item instanceof Treasure) {
        foundGold = true;

        return (
          <TreasureDisplay
            key={i}
            treasure={item}
            onCollect={() => {
              alterPlayerGold(item.value);

              const newRoom: Room = room.cloneRoom();

              newRoom.items.splice(i, 1);

              setRoom(newRoom);
            }}
          />
        );
      }
    });

    if (!foundGold) {
      itemsToRender.push(<TreasureDisplay key="no treasure" treasure={null} />);
    }

    return itemsToRender;
  }
}
