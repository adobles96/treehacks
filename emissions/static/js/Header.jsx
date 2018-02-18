// Header.jsx
import React from "react";

import css from '../css/Header.scss';

export default class Header extends React.Component {
  render () {
    return (
      <div className= {"header_container"}>
        <p className= {"header_title"}>My <i className={"fa fa-car"}/>bon Footprint</p>
      </div>
    );
  }
}
