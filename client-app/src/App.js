import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';
import './App.css';

import Welcome from './Welcome';
import Navigation from './Navigation';
import ArtistContentContainer from './ArtistContentContainer';
import AlbumContentContainer from './AlbumContentContainer';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <h2>Music library</h2>
          <Navigation />

          <Route path="/" exact component={Welcome} />
          <Route path="/albums" component={AlbumContentContainer}/>
          <Route path="/artists" component={ArtistContentContainer}/>
        </div>
      </Router>
    );
  }
}

export default App;
