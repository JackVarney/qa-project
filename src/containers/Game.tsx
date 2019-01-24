import React, { Component } from "react";
import { generateMaze } from "../lib/generateMaze";
import { Room } from "../lib/room";
import GameInterface from "../components/GameInterface";
import { Player } from "../types/player";
import "./Game.css";
import { Passage } from "../lib/passage";
import { Treasure } from "../lib/treasure";

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
          depositGold={this.depositCoin}
          restartGame={() => {
            restartGame();
            this.setState({
              player: {
                wealth: 0
              }
            });
          }}
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

  depositCoin = () => {
    const { rooms, currentRoomId } = this.props;
    const { player } = this.state;

    if (player.wealth < 1) {
      alert("No coins to deposit!");
    } else {
      const room: Room = rooms[this.getRoomIndexFromId(currentRoomId)].cloneRoom();

      room.items.push(new Treasure("Coin", 1));

      this.setRoom(room);
      this.setState({
        player: {
          ...player,
          wealth: player.wealth - 1
        }
      });
    }
  };

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
