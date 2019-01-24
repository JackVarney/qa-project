import React, { Component } from "react";
import Modal from "./Modal";
import "./IngameMenu.css";
import LoadButton from "./LoadButton";
import { Room } from "../lib/room";

interface Props {
  showMenu: boolean;
  onClose: () => void;
  onLoad: (rooms: Room[]) => void;
  restartGame: () => void;
}

export default class IngameMenu extends Component<Props> {
  render() {
    const { showMenu, onClose, onLoad, restartGame } = this.props;

    return (
      <Modal show={showMenu} onClose={onClose}>
        <div className="IngameMenu">
          <span className="IngameMenu__title">Options</span>
          <LoadButton
            onLoad={(rooms: Room[]) => {
              onLoad(rooms);
              onClose();
            }}
          />
          <button className="IngameMenu__restart-button" onClick={restartGame}>
            Restart
          </button>
        </div>
      </Modal>
    );
  }
}
