import React from 'react';
import axios from 'axios';

import ListItemContainer from './ListItemContainer';
import ArtistDetails from './ArtistDetails';

class ArtistContentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            artists: [],
            currentArtist: {name: '', dateOfBirth: '', albums: []}
        };

        this.handleArtistLinkClick = this.handleArtistLinkClick.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3030/api/artist/list')
            .then(response => {
                this.setState({artists: response.data});
            });
    }

    handleArtistLinkClick(e) {
        e.preventDefault();
        const artistId = e.target.id;
        axios.get(`http://localhost:3030/api/artist/${artistId}`)
            .then(response => {
                this.setState({currentArtist: response.data});
            });
    }

    render() {
        return (
            <div className="row content-row">
                <ListItemContainer type={'artist'} data={this.state.artists} handleClick={this.handleArtistLinkClick}/>
                <ArtistDetails artist={this.state.currentArtist}/>
            </div>            
        );
    }
}

export default ArtistContentContainer;