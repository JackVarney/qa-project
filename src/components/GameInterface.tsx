import React, { Component } from "react";
import { Room } from "../lib/room";
import DirectionalButtons from "./DirectionalButtons";
import Items from "./Items";
import { Player } from "../types/player";
import "./GameInterface.css";
import IngameMenu from "./IngameMenu";
import GameCompletionModal from "./GameCompletionModal";

interface Props {
  room: Room;
  setRoom: (room: Room) => void;
  alterPlayerGold: (gold: number) => void;
  player: Player;
  onLoad: (rooms: Room[]) => void;
  restartGame: () => void;
  onCreateConfig: (rooms: Room[]) => void;
}

interface State {
  showMenu: boolean;
  showGameCompletionModal: boolean;
}

export default class GameInterface extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showMenu: false,
      showGameCompletionModal: false
    };
  }

  render() {
    const { onCreateConfig, room, setRoom, alterPlayerGold, player, onLoad, restartGame } = this.props;
    const { showMenu, showGameCompletionModal } = this.state;

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
        <DirectionalButtons
          room={room}
          setRoom={setRoom}
          onGameComplete={() => {
            this.setState({ showGameCompletionModal: true });
          }}
        />
        <p className="GameInterface__player">Player Wealth: {player.wealth}</p>
        <GameCompletionModal
          score={player.wealth}
          show={showGameCompletionModal}
          onClose={() => {
            this.setState({
              showGameCompletionModal: false
            });
          }}
          onCreateConfig={onCreateConfig}
          restartGame={restartGame}
        />
      </div>
    );
  }
}
