import React, { Component } from "react";
import { Threat } from "../lib/threat";

interface Props {
  threat: Threat;
  onAction: () => void;
}

export default class ThreatDisplay extends Component<Props> {
  render() {
    const { threat, onAction } = this.props;

    return (
      <div>
        <span>You have encountered a {threat.name}</span>
        <button onClick={onAction}>{threat.action.name}</button>
      </div>
    );
  }
}
