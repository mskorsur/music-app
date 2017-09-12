import React, { Component } from 'react';
import './App.css';
import Navigation from './Navigation';
import ListItemContainer from './ListItemContainer';
import ArtistDetails from './ArtistDetails';
import AlbumDetails from './AlbumDetails';

const ARTISTS = [
  {id: 1, name: 'Lady Gaga', url: '/artist/LadyGaga'},
  {id: 2, name: 'Rihanna', url: '/artist/Rihanna'},
  {id: 3, name: 'Bruno Mars', url: '/artist/BrunoMars'},
  {id: 4, name: 'The Weeknd', url: '/artist/TheWeeknd'},
];

const ARTIST = {name: 'Lady Gaga', dob: '28-3-1986', albums: ['Joanne', 'The Fame Monster', 'Born This Way']};
const ALBUM = {name: 'Born This Way', artist: 'Lady Gaga', releaseDate: '23-5-2011', genre: ['Pop', 'Electronic', 'Rock']};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contentType: 'artist',
      data: ''
    }
  }

  render() {
    return (
    <div className="container">
      <h2>Music library</h2>
      <Navigation />

      <div className="row content-row">
        <ListItemContainer type={this.state.contentType} data={ARTISTS}/>
        <AlbumDetails type={this.state.contentType} data={ALBUM}/>
      </div>

    </div>
    );
  }
}

export default App;
