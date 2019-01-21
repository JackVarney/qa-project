import React, { Component } from "react";
import { generateMaze } from "../lib/generateMaze";
import { Room } from "../lib/room";
import GameInterface from "../components/GameInterface";

interface Props {}

interface State {
  currentRoom: Room;
}

export default class Game extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const rooms = generateMaze();
    console.log(rooms);

    this.state = {
      currentRoom: rooms[0]
    };
  }

  render() {
    const { currentRoom } = this.state;

    return <GameInterface room={currentRoom} setRoom={this.setRoom} />;
  }

  setRoom = (room: Room): void => {
    this.setState({ currentRoom: room });
  };
}
