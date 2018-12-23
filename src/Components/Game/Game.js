import React, { Component } from 'react';
import '../Game/Game.css';
import Number from '../Number/Number'

class Game extends Component {

  render() {

    const randomNumber = (min, max) => {
      Math.floor(Math.random() * (max - min + 1) + min);
    }

    challengeNumbers = Array.from( { length: this.props.challengeSize })
                            .map(() => randomNumber(...this.props.challengeRange))

    target = _.sampleSize(
      this.challengeNumbers,
      this.props.challengeSize - 2
    ).reduce((acc, curr) => acc + curr, 0);

    return(
      <div>
        <div className="game">
          <div className="help">
            Pick 4 numbers that sum to the target in 15 seconds
          </div>
          <div className="target">42</div>
          <div className="challenge-numbers">
            <Number value={8} />
            <Number value={5} />
            <Number value={12} />
            <Number value={13} />
            <Number value={5} />
            <Number value={16} />
          </div>
          <div className="footer">
            <div className="timer-value">15</div>
            <button>Start</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Game