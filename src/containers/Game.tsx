import React, { Component } from "react";
import { generateMaze } from "../lib/generateMaze";
import { Room } from "../lib/room";
import GameInterface from "../components/GameInterface";
import { Player } from "../types/player";
import "./Game.css";
import { Passage } from "../lib/passage";

interface Props {
  restartGame: () => void;
  onLoad: (rooms: Room[]) => void;
  rooms: Room[];
  setRooms: (rooms: Room[], currentRoomId: string) => void;
  currentRoomId: string;
  onCreateConfig: (rooms: Room[]) => void;
}

interface State {
  player: Player;
}

export default class Game extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      player: {
        wealth: 0
      }
    };
  }

  render() {
    const { currentRoomId, rooms, onLoad, restartGame, onCreateConfig } = this.props;
    const { player } = this.state;

    const currentRoom = rooms[this.getRoomIndexFromId(currentRoomId)];

    return (
      <div className="Game">
        <h2>Room: {currentRoom.id}</h2>
        <GameInterface
          restartGame={restartGame}
          onLoad={onLoad}
          player={player}
          room={currentRoom}
          setRoom={this.setRoom}
          alterPlayerGold={this.alterPlayerGold}
          onCreateConfig={onCreateConfig}
        />
      </div>
    );
  }

  getRoomIndexFromId(id: string): number {
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
    const { setRooms, rooms } = this.props;

    const newRooms = rooms.filter(r => r.id !== room.id);

    setRooms([...newRooms, room], room.id);
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
