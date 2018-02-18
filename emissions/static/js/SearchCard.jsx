// SearchCard.jsx
import React from "react";
import ResultCard from './ResultCard'

import css from '../css/SearchCard.scss';

export default class SearchCard extends React.Component {
  constructor (props) {
    super(props);
    this.state= {
      open: false,
      zip: '',
      miles: '',
      electric: 0,
      gas: 0,
      trees: 0,
    };

    this.changeOpen = this.changeOpen.bind(this);
    this.handleZip = this.handleZip.bind(this);
    this.handleMiles = this.handleMiles.bind(this);
  }

  changeOpen () {
    this.setState(prevState => ({
      open: true,
    }));
    
    $.ajax({
      url: '/calculate',
      type: 'GET',
      data: {zipcode: this.state.zip, 
             miles: this.state.miles},
      success: (response) => {
        var obj = JSON.parse(response);
        console.log(JSON.stringify(response));
        this.setState({electric: obj.electric,
                       gas: obj.gas,
                       trees: obj.trees 
                       });
      },
      error: (response) => {
        console.log(JSON.stringify(response))
      }
    });
  }

  handleZip (event) {
    this.setState({zip: event.target.value});
  }

  handleMiles (event) {
    this.setState({miles: event.target.value});
  }

  render () {
    return (
      <div className= {"card_container"}>
        <div className ={"input_container"}>
          <h3>Zip</h3>
          <input value= {this.state.zip} onChange={this.handleZip}/>
        </div>
        <div className ={"input_container"}>
          <h3>Weekly Mileage Est.</h3>
          <input value= {this.state.miles} onChange={this.handleMiles}/>
        </div>
        <div onClick={this.changeOpen} className= {"card_submit"}>
          <h3>Let's Go!</h3>
        </div>
        {this.state.open ?
        <ResultCard electric= {this.state.electric} 
          gas={this.state.gas} 
          trees={this.state.trees}
          zip= {this.state.zip} 
          miles= {this.state.miles} /> :
        <div>NO</div>}
      </div>
    );
  }
}
