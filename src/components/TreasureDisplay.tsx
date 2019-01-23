import React, { Component } from "react";
import { Treasure } from "../lib/treasure";
import coin from "./Gold.png";
import "./TreasureDisplay.css";

interface Props {
  treasure: Treasure | null;
  onCollect?: () => void;
}

export default class TreasureDisplay extends Component<Props> {
  render() {
    const { treasure, onCollect } = this.props;

    if (treasure instanceof Treasure) {
      return (
        <div className="Treasure">
          <span className="Treasure__gold">
            {`${treasure.name}: ${treasure.value}`}
            <img className="Treasure__image" src={coin} alt="Image of treasure" />
          </span>
          <button className="Treasure__collect-button" onClick={onCollect}>
            collect gold
          </button>
        </div>
      );
    } else {
      return (
        <div className="Treasure">
          <p>There is no treasure to be found here!</p>
        </div>
      );
    }
  }
}
