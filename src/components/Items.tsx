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

  setPassage = (passage: Passage | null, newRoom: Room) => {
    if (passage instanceof Passage) {
      if (passage.entrance!.id === newRoom.id) {
        passage.entrance = newRoom;
      } else {
        passage.exit = newRoom;
      }
    }
  };

  removeItem = (id: number, room: Room) => {
    const newRoom = new Room(room.id);

    newRoom.east = room.east;
    this.setPassage(newRoom.east, newRoom);

    newRoom.south = room.south;
    this.setPassage(newRoom.south, newRoom);

    newRoom.west = room.west;
    this.setPassage(newRoom.west, newRoom);

    newRoom.north = room.north;
    this.setPassage(newRoom.north, newRoom);

    newRoom.items = room.items.filter((_, i) => i !== id);

    this.props.setRoom(newRoom);
  };
}
