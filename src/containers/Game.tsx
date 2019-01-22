import React, { Component } from "react";
import { generateMaze } from "../lib/generateMaze";
import { Room } from "../lib/room";
import GameInterface from "../components/GameInterface";
import { Player } from "../types/player";

interface Props {}

interface State {
  rooms: Room[];
  currentRoomId: string;
  player: Player;
}

export default class Game extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const rooms = generateMaze();
    const roomId = rooms[0].id;

    this.state = {
      rooms,
      currentRoomId: roomId,
      player: {
        wealth: 0
      }
    };
  }

  render() {
    const { rooms, currentRoomId, player } = this.state;

    const currentRoom = rooms[this.getRoomFromId(currentRoomId)];

    return (
      <GameInterface player={player} room={currentRoom} setRoom={this.setRoom} alterPlayerGold={this.alterPlayerGold} />
    );
  }

  getRoomFromId(id: string) {
    const { rooms } = this.state;

    return rooms.reduce((roomIndex, room, i) => {
      if (id === room.id) {
        roomIndex = i;
      }

      return roomIndex;
    }, 0);
  }

  setRoom = (room: Room): void => {
    const rooms = [...this.state.rooms];

    const index = this.getRoomFromId(room.id);

    rooms[index] = room;

    this.setState({ rooms });
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
