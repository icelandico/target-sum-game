import React, { Component } from 'react';
import './App.css';
import Game from '../Game/Game'

class App extends Component {

  state = {
    gameId: 1
  };

  resetGame = () => {
    this.setState((prevState) => ({
      gameId: prevState.gameId + 1
    }))
  }

  render() {
    return (
      <div className="App">
        <Game
          key={this.state.gameId}
          autoPlay={this.state.gameId > 1} 
          challengeSize={6}
          challengeRange={[2, 9]}
          answerSize={4}
          initialSeconds={15}
          onPlayAgain={this.resetGame}
        />
      </div>
    );
  }
}

export default App;
