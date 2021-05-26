import React, { Component } from 'react';
import { render } from 'react-dom';
import Card from './cardsDetails';
import './style.css';

interface AppProps { }
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      names: ['jitendra19', 'tj', 'jeeyyy', 'dhruvdutt']
    };
  }

  render() {
    return (
      <div>
        <h1>GitHub cards App </h1>
        <Card {...this.state} />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
