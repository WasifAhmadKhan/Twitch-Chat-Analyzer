
import './App.css';
import React, { Component } from 'react'
import NavBar from './NavBar';
import Twich from './Twich';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Twich/>
      </div>
    )
  }
}

