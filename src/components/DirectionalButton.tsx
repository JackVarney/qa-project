import React, { StatelessComponent, MouseEvent } from "react";
import "./DirectionalButton.css";

interface Props {
  onClick: (event: MouseEvent) => void;
}

const DirectionalButton: StatelessComponent<Props> = ({ onClick, children }) => (
  <button className="DirectionalButton" onClick={onClick}>
    {children}
  </button>
);

export default DirectionalButton;
