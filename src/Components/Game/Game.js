import React, { Component } from 'react';
import '../Game/Game.css';
import Number from '../Number/Number'
import _ from 'lodash'

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const colors = {
  new: '#008B8B',
  playing: '#6495ED',
  won: '#3CB371',
  lost: '#F08080'
}

class Game extends Component {

  state = {
    gameStatus: 'new',
    remainingSeconds: this.props.initialSeconds,
    selectedIds: []
  }

  static bgColors = {
    playing: '#ccc',
    won: 'green',
    lost: 'red'
  }

  challengeNumbers = Array.from({ length: this.props.challengeSize })
    .map(() => randomNumber(...this.props.challengeRange))

  target = _.sum(
    _.sampleSize(this.challengeNumbers, this.props.answerSize)
  );

  isNumberAvailable = numberIndex => this.state.selectedIds.indexOf(numberIndex) === -1;

  startGame = () => {
    this.setState({
      gameStatus: 'playing'
    }, () => {
      this.intervalId = setInterval(() => {
        this.setState((prevState) => {
          const newRemainingSeconds = prevState.remainingSeconds - 1;
          if (newRemainingSeconds === 0) {
            clearInterval(this.intervalId);
            return { gameStatus: 'lost', remainingSeconds: 0 };
          };
          return { remainingSeconds: newRemainingSeconds};
        });
      }, 1000);
    });
  };

  selectNumber = numberIndex => {
    if (this.state.gameStatus !== 'playing') {
      return;
    }
    this.setState((prevState) => ({
      selectedIds: [...prevState.selectedIds, numberIndex],
      gameStatus: this.calcGameStatus(
        [...prevState.selectedIds,numberIndex]
      ),
    }),
    () => {
      if (this.state.gameStatus !== 'playing') {
        clearInterval(this.intervalId);
      }
    });
  };

  calcGameStatus = selectedIds => {
    const sumSelected = selectedIds.reduce((acc, curr) => acc + this.challengeNumbers[curr], 0);
    if (sumSelected < this.target) {
      return 'playing';
    }
    return sumSelected === this.target ? 'won' : 'lost';
  };

  render() {

    return(
      <div>
        <div className="game">
        <p>Numbers are: {this.props.challengeSize}</p>
          <div className="help">
            Pick {this.props.answerSize} numbers that sum to the target in {this.props.initialSeconds} seconds
          </div>
          <div className="target"
               style={{ backgroundColor: colors[this.state.gameStatus] }}
          >
          { this.state.gameStatus === 'new' ? '?' : this.target }
          </div>
          <div className="challenge-numbers">
            {
              this.challengeNumbers.map((value, index) => 
                <Number key={index}
                        id={index}
                        value={this.state.gameStatus === 'new' ? '?' : value}
                        clickable={this.isNumberAvailable(index)}
                />
              )
            }
          </div>
          <div className="footer">
          {
            this.state.gameStatus === 'new' ? 
            (
              <button>Start</button>
            )
              :
            (
              <div className="timer-value">{this.props.initialSeconds}</div>
            )
          }
          {
            ['won', 'lost'].includes(this.state.gameStatus) && (
              <button>Play Again</button>
            )
          }
          </div>
        </div>
      </div>
    )
  }
}

export default Game