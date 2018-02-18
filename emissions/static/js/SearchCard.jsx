// SearchCard.jsx
import React from "react";

import css from '../css/SearchCard.scss';

export default class SearchCard extends React.Component {
  constructor (props) {
    super(props);
    this.state= {
      open: false,
    };

    this.changeOpen = this.changeOpen.bind(this);
  }

  changeOpen () {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  }

  render () {
    return (
      <div className= {"card_container"}>
        <div className ={"input_container"}>
          <h3>Zip</h3>
          <input />
        </div>
        <div className ={"input_container"}>
          <h3>Weekly Mileage Est.</h3>
          <input />
        </div>
        <div onClick={this.changeOpen} className= {"card_submit"}>
          <h3>Let's Go!</h3>
        </div>
        {this.state.open?
        <div>YES</div> :
        <div>NO</div>}
      </div>
    );
  }
}
