import React, { Component } from "react";
import { generateMaze } from "../lib/generateMaze";
import { Room } from "../lib/room";
import GameInterface from "../components/GameInterface";
import { Player } from "../types/player";

interface Props {
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
}

interface State {
  currentRoomId: string;
  player: Player;
}

export default class Game extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      currentRoomId: "",
      player: {
        wealth: 0
      }
    };
  }

  render() {
    const { rooms } = this.props;
    const { currentRoomId, player } = this.state;

    const currentRoom = rooms[this.getRoomFromId(currentRoomId)];

    return (
      <GameInterface player={player} room={currentRoom} setRoom={this.setRoom} alterPlayerGold={this.alterPlayerGold} />
    );
  }

  getRoomFromId(id: string): number {
    const { rooms } = this.props;

    if (id.length === 0) {
      return 0;
    }

    return rooms.reduce((roomIndex, room, i) => {
      if (id === room.id) {
        roomIndex = i;
      }

      return roomIndex;
    }, 0);
  }

  setRoom = (room: Room): void => {
    const { setRooms } = this.props;

    const rooms = [...this.props.rooms];

    const index = this.getRoomFromId(room.id);

    rooms[index] = room;

    this.setState({ currentRoomId: room.id });
    setRooms(rooms);
  };

  alterPlayerGold = (gold: number) => {
    const { player } = this.state;

    this.setState({
      player: {
        ...player,
        wealth: player.wealth + gold
      }
    });
  };
}
