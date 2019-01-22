import React, { Component } from "react";
import { Item } from "../lib/item";
import { Threat } from "../lib/threat";
import { Treasure } from "../lib/treasure";
import { Room } from "../lib/room";
import TreasureDisplay from "./TreasureDisplay";
import ThreatDisplay from "./ThreatDisplay";
import "./Items.css";

interface Props {
  setRoom: (room: Room) => void;
  room: Room;
  alterPlayerGold: (gold: number) => void;
}

export default class Items extends Component<Props> {
  render() {
    const { setRoom, room, alterPlayerGold } = this.props;
    let foundGold: boolean = false;

    const removeItem = (id: number) => {
      const newRoom: Room = room.cloneRoom();

      newRoom.items.splice(id, 1);

      setRoom(newRoom);
    };

    const itemsToRender = room.items.map((item, i) => {
      if (item instanceof Treasure) {
        foundGold = true;

        return (
          <TreasureDisplay
            key={i}
            treasure={item}
            onCollect={() => {
              alterPlayerGold(item.value);

              removeItem(i);
            }}
          />
        );
      } else if (item instanceof Threat) {
        return (
          <ThreatDisplay
            key={i}
            threat={item}
            onAction={() => {
              removeItem(i);
            }}
          />
        );
      }
    });

    if (!foundGold) {
      itemsToRender.push(<TreasureDisplay key="no treasure" treasure={null} />);
    }

    return <div className="Items">{itemsToRender}</div>;
  }
}
