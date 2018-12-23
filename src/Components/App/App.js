import React, { Component } from 'react';
import './App.css';
import Game from '../Game/Game'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game 
          challengeSize={6}
          challengeRange={[2, 9]}
        />
      </div>
    );
  }
}

export default App;
