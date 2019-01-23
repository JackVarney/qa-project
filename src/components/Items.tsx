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
    const { setRoom, room, alterPlayerGold } = this.props;
    let foundGold: boolean = false;

    const setPassage = (passage: Passage | null, newRoom: Room) => {
      if (passage instanceof Passage) {
        if (passage.entrance!.id === newRoom.id) {
          passage.entrance = newRoom;
        } else {
          passage.exit = newRoom;
        }
      }
    };

    const removeItem = (id: number) => {
      const newRoom = new Room(room.id);

      newRoom.east = room.east;
      setPassage(newRoom.east, newRoom);

      newRoom.south = room.south;
      setPassage(newRoom.south, newRoom);

      newRoom.west = room.west;
      setPassage(newRoom.west, newRoom);

      newRoom.north = room.north;
      setPassage(newRoom.north, newRoom);

      newRoom.items = room.items.filter((_, i) => i !== id);

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
