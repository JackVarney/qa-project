import React, { StatelessComponent, MouseEvent } from "react";
import "./DirectionalButton.css";

interface Props {
  onClick: (event: MouseEvent) => void;
  disabled: boolean;
}

const DirectionalButton: StatelessComponent<Props> = ({ onClick, disabled, children }) => (
  <button className={`DirectionalButton ${disabled && "DirectionalButton--disabled"}`} onClick={onClick}>
    {children}
  </button>
);

export default DirectionalButton;
