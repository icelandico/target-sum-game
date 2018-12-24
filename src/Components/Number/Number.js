import React from 'react';

class Number extends React.PureComponent {

  handleClickNum = () => {
    return this.props.clickable ? this.props.onClick(this.props.id) : null 
  }

  render() {
    return(
      <div className="number"
           style={{ opacity: this.props.clickable ? 1 : 0.3 }}
           onClick={this.handleClickNum}
      >
        {this.props.value}
      </div>
    )
  }
}

export default Number