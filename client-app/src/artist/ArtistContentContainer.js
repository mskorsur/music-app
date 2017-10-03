import React from 'react';
import axios from 'axios';

import ListItemContainer from '../ListItemContainer';
import ArtistDetails from './ArtistDetails';
import CreateArtistForm from './CreateArtistForm';

class ArtistContentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            artists: [],
            currentArtist: {name: '', dateOfBirth: '', albums: []},
            creatingNewArtist: false
        };

        this.handleArtistLinkClick = this.handleArtistLinkClick.bind(this);
        this.handleCreateNewArtistClick = this.handleCreateNewArtistClick.bind(this);
        this.renderNewArtistForm = this.renderNewArtistForm.bind(this);
        this.handleCancelFormClick = this.handleCancelFormClick.bind(this);
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

    handleCreateNewArtistClick() {
        this.setState({creatingNewArtist: true});
    }

    handleCancelFormClick() {
        this.setState({creatingNewArtist: false});
    }

    renderNewArtistForm() {
        if (this.state.creatingNewArtist) {
            return <CreateArtistForm handleCancel={this.handleCancelFormClick}/>;
        }
    }

    render() {
        return (
            <div className="row content-row">
                <ListItemContainer type={'artist'} 
                                   data={this.state.artists} 
                                   handleLinkClick={this.handleArtistLinkClick} 
                                   handleButtonClick={this.handleCreateNewArtistClick}/>
                <ArtistDetails artist={this.state.currentArtist}/>
                {this.renderNewArtistForm()}
            </div>            
        );
    }
}

export default ArtistContentContainer;