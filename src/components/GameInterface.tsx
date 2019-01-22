import React, { Component } from "react";
import { Room } from "../lib/room";
import DirectionalButtons from "./DirectionalButtons";
import Items from "./Items";
import { Player } from "../types/player";

interface Props {
  room: Room;
  setRoom: (room: Room) => void;
  alterPlayerGold: (gold: number) => void;
  player: Player;
}

export default class GameInterface extends Component<Props> {
  render() {
    const { room, setRoom, alterPlayerGold, player } = this.props;

    return (
      <div className="GameInterface">
        <Items room={room} setRoom={setRoom} alterPlayerGold={alterPlayerGold} />
        <DirectionalButtons room={room} setRoom={setRoom} />
        <p>{`Player Wealth ${player.wealth}`}</p>
      </div>
    );
  }
}
