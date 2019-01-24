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
import CreateConfigButton from "../components/CreateConfigButton";

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
          onCreateConfig={this.onCreateConfig}
          setRooms={(rooms: Room[], currentRoomId: string) => {
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
        <CreateConfigButton onClick={this.onCreateConfig} />
        <button
          className="Test"
          onClick={() => {
            saveMaze(this.state.rooms);
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

  onCreateConfig = (rooms: Room[]) => {
    this.setState({
      hasConfig: true,
      ogRooms: rooms,
      rooms
    });
  };
}
