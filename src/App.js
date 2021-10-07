
import './App.css';
import React, { Component } from 'react'
import NavBar from './NavBar';
import Twich from './Twich';


export default class App extends Component {
  constructor(){
    super();
    document.body.style.backgroundColor = '#042743';
  }
  render() {
    return (
      <div>
        <NavBar/>
        <Twich/>
      </div>
    )
  }
}

