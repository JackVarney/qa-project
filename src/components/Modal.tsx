import React, { Component } from "react";
import "./Modal.css";

interface Props {
  show: Boolean;
  onClose: () => void;
}

export default class Modal extends Component<Props> {
  render() {
    const { show, children, onClose } = this.props;

    return (
      <>
        {show ? (
          <div className="Modal" onClick={onClose}>
            <div className="Modal__content-container">
              {children}
              <button className="Modal__exit-button" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
