import React, { Component } from "react";
import { Item } from "../lib/item";
import { Threat } from "../lib/threat";
import { Treasure } from "../lib/treasure";
import { Room } from "../lib/room";
import TreasureDisplay from "./TreasureDisplay";
import ThreatDisplay from "./ThreatDisplay";
import "./Items.css";
import { Passage } from "../lib/passage";

interface Props {
  setRoom: (room: Room) => void;
  room: Room;
  alterPlayerGold: (gold: number) => void;
}

export default class Items extends Component<Props> {
  render() {
    const { room, alterPlayerGold } = this.props;
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
              this.removeItem(i, room);
            }}
          />
        );
      } else if (item instanceof Threat) {
        return (
          <ThreatDisplay
            key={i}
            threat={item}
            onAction={() => {
              this.removeItem(i, room);
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

  removeItem = (id: number, room: Room) => {
    const newRoom = room.cloneRoom();

    newRoom.items = room.items.filter((_, i) => i !== id);

    this.props.setRoom(newRoom);
  };
}
