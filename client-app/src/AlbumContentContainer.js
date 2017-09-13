import React from 'react';

import ListItemContainer from './ListItemContainer';
import AlbumDetails from './AlbumDetails';

const ARTISTS = [
    {id: 1, name: 'Lady Gaga', url: '/artist/LadyGaga'},
    {id: 2, name: 'Rihanna', url: '/artist/Rihanna'},
    {id: 3, name: 'Bruno Mars', url: '/artist/BrunoMars'},
    {id: 4, name: 'The Weeknd', url: '/artist/TheWeeknd'},
  ];
  
const ALBUM = {name: 'Born This Way', artist: 'Lady Gaga', releaseDate: '23-5-2011', genre: ['Pop', 'Electronic', 'Rock']};

class AlbumContentContainer extends React.Component {
    render() {
        return (
            <div className="row content-row">
                <ListItemContainer type={'album'} data={ARTISTS}/>
                <AlbumDetails data={ALBUM}/>
            </div>
        );
    }
}

export default AlbumContentContainer;