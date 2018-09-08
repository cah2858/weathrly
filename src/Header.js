import React, { Component } from 'react';

import Search from './Search';
import './Header.css'

export default class Header extends Component {
  constructor () {
    super();
  }

  render() {
    return(
      <header className='header-container'>
        <h1 className='header-title'>Weathrly</h1>
        <Search changeSelectedLocation={this.props.changeSelectedLocation}/>
      </header>
    );
  }
}