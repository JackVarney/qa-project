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
}

export default class GameMenu extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasConfig: false,
      rooms: [],
      ogRooms: []
    };
  }

  render() {
    const { hasConfig, rooms } = this.state;

    if (hasConfig) {
      return (
        <Game
          rooms={rooms}
          setRooms={(rooms: Room[]) => {
            this.setState({ rooms });
          }}
        />
      );
    } else {
      return this.renderConfigCreation();
    }
  }

  renderConfigCreation(): JSX.Element {
    return (
      <div className="GameMenu">
        <LoadButton
          onLoad={rooms => {
            this.setState({
              rooms: rooms,
              ogRooms: rooms,
              hasConfig: true
            });
          }}
        />
        <button className="GameMenu__create-button" onClick={this.onCreateConfig}>
          Create Config
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
