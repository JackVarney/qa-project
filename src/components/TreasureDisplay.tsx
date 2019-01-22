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
        <div className=".Treasure__wrapper">
          <img src={coin} alt="Image of treasure" />
          <p>{`${treasure.name}: ${treasure.value}`}</p>
          <button onClick={onCollect}>collect gold</button>
        </div>
      );
    } else {
      return (
        <div className="Treasure__wrapper">
          <p>NO TREASURE FOR YOU SON</p>
        </div>
      );
    }
  }
}
