import React, { Component } from "react";
import Modal from "./Modal";
import CreateConfigButton from "./CreateConfigButton";
import { Room } from "../lib/room";
import "./GameCompletionModal.css";

interface Props {
  show: boolean;
  onClose: () => void;
  onCreateConfig: (rooms: Room[]) => void;
  restartGame: () => void;
  score: number;
}

export default class GameCompletionModal extends Component<Props> {
  render() {
    const { show, onClose, restartGame, onCreateConfig, score } = this.props;

    return (
      <Modal show={show} onClose={onClose}>
        <span className="GameCompletionModal__congratulations">Congratulations on completing the game!</span>
        <span className="GameCompletionModal__score">Your score is: {score} wealth!</span>
        <button className="GameCompletionModal__restart-button" onClick={restartGame}>
          Restart Game
        </button>
        <CreateConfigButton onClick={onCreateConfig} />
      </Modal>
    );
  }
}
