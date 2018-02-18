// App.jsx
import React from "react";
import SearchCard from './SearchCard';
import Header from './Header';

import css from '../css/app.scss';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state= {
      open: true,
    };

    this.changeOpen = this.changeOpen.bind(this);
  }

  changeOpen () {
    this.setState(prevState => ({
      open: false,
    }));
  }

  render () {
    return (
      <div className= {"app_container"}>
        <Header />
        {this.state.open ?
        <div className= {"introduction"}>
          <i className= {"fa fa-times-circle"} onClick={this.changeOpen} />
          <p className= {"quote"}>“Why should I even buy an electric car? Doesn’t that energy just come from burning coal anyway?”
          </p>
          <p>Across the United States, energy producers in different regions employ varying resource mixes for providing grid energy. As such, the environmental consequences of energy production vary significantly from region to region. Using publicly available EPA data, MyCarbonFootprint allows users to visualize the environmental impact of switching to an electric vehicle given their region’s energy resource mix.</p>
        </div>
        :
        <div/>}
        <SearchCard />
      </div>
    );
  }
}
