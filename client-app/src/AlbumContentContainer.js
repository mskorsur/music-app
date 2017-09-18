import React from 'react';
import axios from 'axios';

import ListItemContainer from './ListItemContainer';
import AlbumDetails from './AlbumDetails';

class AlbumContentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: [],
            currentAlbum: {name: '', artist: '', genre: []}
        };

        this.handleAlbumLinkClick = this.handleAlbumLinkClick.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3030/api/album/list')
        .then(response => {
            this.setState({albums: response.data});
        });
    }

    handleAlbumLinkClick(e) {
        e.preventDefault();
        const albumId = e.target.id;
        axios.get(`http://localhost:3030/api/album/${albumId}`)
            .then(response => {
                this.setState({currentAlbum: response.data});
            });
    }

    render() {
        return (
            <div className="row content-row">
                <ListItemContainer type={'album'} data={this.state.albums} handleClick={this.handleAlbumLinkClick}/>
                <AlbumDetails data={this.state.currentAlbum}/>
            </div>
        );
    }
}

export default AlbumContentContainer;