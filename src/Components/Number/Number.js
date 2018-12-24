import React, { Component } from 'react';

class Number extends Component {
  render() {
    return(
      <div className="number"
           style={{ opacity: this.props.clickable ? 1 : 0.3 }}
           onClick={ () => console.log(this.props.id) }
      >
        {this.props.value}
      </div>
    )
  }
}

export default Number