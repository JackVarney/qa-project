import React, { Component } from "react";
import "./DepositGold.css";

interface Props {
  onDeposit: () => void;
}

export default class DepositGold extends Component<Props> {
  render() {
    return (
      <button className="DepositGold" onClick={this.props.onDeposit}>
        Deposit Coin
      </button>
    );
  }
}
