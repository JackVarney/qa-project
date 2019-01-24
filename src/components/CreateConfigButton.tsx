import React, { Component } from "react";
import { Room } from "../lib/room";
import { generateMaze } from "../lib/generateMaze";
import { saveMaze } from "../lib/saveGame";

interface Props {
  onClick: (rooms: Room[]) => void;
}

export default class CreateConfigButton extends Component<Props> {
  render() {
    return (
      <button className="GameMenu__create-button" onClick={this.onCreateConfig}>
        Create New Config
      </button>
    );
  }

  onCreateConfig = () => {
    const { onClick } = this.props;
    const rooms: Room[] = generateMaze();

    if (window.confirm("Would you like to save the config?")) {
      saveMaze(rooms);
    }

    onClick(rooms);
  };
}
