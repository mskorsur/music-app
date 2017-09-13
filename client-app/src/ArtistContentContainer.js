import React from 'react';

import ListItemContainer from './ListItemContainer';
import ArtistDetails from './ArtistDetails';

const ARTISTS = [
    {id: 1, name: 'Lady Gaga', url: '/artist/LadyGaga'},
    {id: 2, name: 'Rihanna', url: '/artist/Rihanna'},
    {id: 3, name: 'Bruno Mars', url: '/artist/BrunoMars'},
    {id: 4, name: 'The Weeknd', url: '/artist/TheWeeknd'},
  ];
  
const ARTIST = {name: 'Lady Gaga', dob: '28-3-1986', albums: ['Joanne', 'The Fame Monster', 'Born This Way']};

class ArtistContentContainer extends React.Component {
    render() {
        return (
            <div className="row content-row">
                <ListItemContainer type={'artist'} data={ARTISTS}/>
                <ArtistDetails data={ARTIST}/>
            </div>            
        );
    }
}

export default ArtistContentContainer;