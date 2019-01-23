import React, { Component } from "react";
import { Threat } from "../lib/threat";
import "./ThreatDisplay.css";

interface Props {
  threat: Threat;
  onAction: () => void;
}

export default class ThreatDisplay extends Component<Props> {
  render() {
    const { threat, onAction } = this.props;

    return (
      <div className="Threat">
        <span className="Threat__text">You have encountered:</span>
        <span className="Threat__name">{threat.name}</span>
        <div className="Threat__action-wrapper">
          <button className="Threat__action" onClick={onAction}>
            {threat.action.name}
          </button>
          <button
            className="Threat__action"
            onClick={() => {
              alert("Didnt work!");
            }}
          >
            {threat.wrongAction.name}
          </button>
        </div>
      </div>
    );
  }
}
