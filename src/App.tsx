import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import GameMenu from "./containers/GameMenu";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Jacks Maze Game</h1>
        <GameMenu />
      </div>
    );
  }
}

export default App;
