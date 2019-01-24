import React, { Component } from "react";
import Game from "./Game";
import { Room } from "../lib/room";
import { generateMaze } from "../lib/generateMaze";
import { directions } from "../lib/directions";
import { Passage } from "../lib/passage";
import { Item } from "../lib/item";
import { saveMaze } from "../lib/saveGame";
import LoadButton from "../components/LoadButton";
import "./GameMenu.css";

interface Props {}

interface State {
  hasConfig: boolean;
  rooms: Room[];
  ogRooms: Room[];
  currentRoomId: string;
}

export default class GameMenu extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasConfig: false,
      rooms: [],
      ogRooms: [],
      currentRoomId: ""
    };
  }

  render() {
    const { hasConfig, rooms, currentRoomId } = this.state;

    if (hasConfig) {
      return (
        <Game
          restartGame={this.restartGame}
          onLoad={this.onLoad}
          currentRoomId={currentRoomId}
          rooms={rooms}
          setRooms={(rooms: Room[], currentRoomId: string) => {
            console.log("set rooms", rooms);
            this.setState({ rooms, currentRoomId });
          }}
        />
      );
    } else {
      return this.renderConfigCreation();
    }
  }

  restartGame = () => {
    this.setState({
      rooms: this.state.ogRooms
    });
  };

  renderConfigCreation(): JSX.Element {
    return (
      <div className="GameMenu">
        <LoadButton onLoad={this.onLoad} />
        <button className="GameMenu__create-button" onClick={this.onCreateConfig}>
          Create New Config
        </button>
        <button
          className="Test"
          onClick={() => {
            this.saveConfig(this.state.rooms);
          }}
        >
          TEST
        </button>
      </div>
    );
  }

  onLoad = (rooms: Room[]) => {
    this.setState({
      rooms: rooms,
      ogRooms: rooms,
      hasConfig: true
    });
  };

  onCreateConfig = () => {
    const rooms: Room[] = generateMaze();

    this.setState({
      hasConfig: true,
      ogRooms: rooms,
      rooms
    });
  };

  saveConfig = (rooms: Room[]) => {
    saveMaze(rooms);
  };
}
