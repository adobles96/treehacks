// App.jsx
import React from "react";
import SearchCard from './SearchCard';
import Header from './Header';

import css from '../css/app.scss';

export default class App extends React.Component {
  render () {
    return (
      <div className= {"app_container"}>
        <Header />
        <SearchCard />
      </div>
    );
  }
}
