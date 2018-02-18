// ResultCard.jsx
import React from "react";

import css from '../css/ResultCard.scss';

export default class ResultCard extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    let savings = this.props.gas - this.props.electric;
    var chart_style = {
      height: (this.props.electric / this.props.gas) * 100,
      background: "white",
      width: "100%"
    };

    var trees = [];
    for (var i = 0; i < this.props.trees; i++) {
      trees.push(
        <i className={"fa fa-tree"} />
      )
    };
  
    return (
      <div className= {"container"}>
        <p className= {"title"}>Results</p>
        <div className= {"co2_compare"}>
          <div className= {"pounds_left"}>You currently produce {Math.trunc(this.props.gas)} lbs. of carbon dioxide in a year</div>
          <div className= {"chart"}>
            <div style={{height: "100%", background: "white", width: "100%"}}/>
          </div>
          <div className= {"chart"}>
            <div style={chart_style}/>
          </div>

          <div className= {"pounds_right"}>By switching to an electric vehicle, you would produce only {Math.trunc(this.props.electric)} lbs. of carbon dioxide in a year!</div>
        </div>
        <div className= {"title"}>Impact</div>
        <div className= {"trees_container"}>
          {trees}
        </div>
        <div className= {"trees_desc"}>A {Math.trunc(savings)} lbs. per year reduction is equivalent to planting {Math.trunc(this.props.trees)} new trees!</div>
      </div>
    );
  }
}
