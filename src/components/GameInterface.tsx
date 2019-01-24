import React, { Component } from "react";
import { Room } from "../lib/room";
import DirectionalButtons from "./DirectionalButtons";
import Items from "./Items";
import { Player } from "../types/player";
import "./GameInterface.css";
import IngameMenu from "./IngameMenu";

interface Props {
  room: Room;
  setRoom: (room: Room) => void;
  alterPlayerGold: (gold: number) => void;
  player: Player;
  onLoad: (rooms: Room[]) => void;
  restartGame: () => void;
}

interface State {
  showMenu: boolean;
}

export default class GameInterface extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showMenu: false
    };
  }

  render() {
    const { room, setRoom, alterPlayerGold, player, onLoad, restartGame } = this.props;
    const { showMenu } = this.state;

    return (
      <div className="GameInterface">
        <button
          onClick={() => {
            this.setState({
              showMenu: !showMenu
            });
          }}
        >
          Show Menu
        </button>
        <IngameMenu
          restartGame={restartGame}
          onLoad={onLoad}
          showMenu={showMenu}
          onClose={() => {
            this.setState({ showMenu: false });
          }}
        />
        <Items room={room} setRoom={setRoom} alterPlayerGold={alterPlayerGold} />
        <DirectionalButtons room={room} setRoom={setRoom} />
        <p className="GameInterface__player">Player Wealth: {player.wealth}</p>
      </div>
    );
  }
}
