import React, { Component } from "react";
import { Room } from "../lib/room";

interface Props {
  room: Room;
}

export default class GameInterface extends Component<Props> {
  render() {
    const { room } = this.props;

    console.log(room);

    return <></>;
  }
}
