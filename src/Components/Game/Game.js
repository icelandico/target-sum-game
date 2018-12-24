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

  notClickedColor = {
    playing: '#ccc',
    won: 'green',
    lost: 'red'
  }

  challengeNumbers = Array.from({ length: this.props.challengeSize })
    .map(() => randomNumber(...this.props.challengeRange))

  target = _.sum(
    _.sampleSize(this.challengeNumbers, this.props.answerSize)
  );

  render() {

    return(
      <div>
        <div className="game">
        <p>Numbers are: {this.props.challengeSize}</p>
          <div className="help">
            Pick {this.props.answerSize} numbers that sum to the target in {this.props.initialSeconds} seconds
          </div>
          <div className="target">{this.target}</div>
          <div className="challenge-numbers">
            {
              this.challengeNumbers.map((value, index) => 
                <Number key={index}
                        value={value}
                />
              )
            }
          </div>
          <div className="footer">
            <div className="timer-value">{this.props.initialSeconds}</div>
            <button>Start</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Game