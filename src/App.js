import React, { Component } from 'react';
import Home from './components/home';
import './App.css';
import {Provider} from 'react-redux';
import store from './store';

class App extends Component {

  constructor(props) {
    super(props)
      this.state={}
  }

  render() {
    return (
      <Provider store={store}>
      <div className="App">
        <Home/>
      </div>
      </Provider>
    );
  }
}


export default App;
