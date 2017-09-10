import React, { Component } from 'react';
import './App.css';
import Navigation from './Navigation';
import ListItemContainer from './ListItemContainer';
import DetailsContainer from './DetailsContainer';

const ARTISTS = [
  {id: 1, name: 'Lady Gaga', url: '/artist/LadyGaga'},
  {id: 2, name: 'Rihanna', url: '/artist/Rihanna'},
  {id: 3, name: 'Bruno Mars', url: '/artist/BrunoMars'},
  {id: 4, name: 'The Weeknd', url: '/artist/TheWeeknd'},
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contentType: 'artists'
    }
  }

  render() {
    return (
    <div className="container">
      <h2>Music library</h2>
      <Navigation />

      <div className="row content-row">
        <ListItemContainer type={this.state.contentType} artists={ARTISTS}/>
        <DetailsContainer />
      </div>

    </div>
    );
  }
}

export default App;
