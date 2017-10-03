import React from 'react';
import axios from 'axios';

import ListItemContainer from '../ListItemContainer';
import ArtistDetails from './ArtistDetails';
import CreateArtistForm from './CreateArtistForm';
import EditArtistForm from './EditArtistForm';

class ArtistContentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            artists: [],
            currentArtist: {id: '', name: '', dateOfBirth: '', albums: []},
            creatingNewArtist: false,
            editingCurrentArtist: false
        };

        this.handleArtistLinkClick = this.handleArtistLinkClick.bind(this);
        this.handleCreateNewArtistClick = this.handleCreateNewArtistClick.bind(this);
        this.renderNewArtistForm = this.renderNewArtistForm.bind(this);
        this.handleCancelFormClick = this.handleCancelFormClick.bind(this);
        this.handleEditCurrentArtistClick = this.handleEditCurrentArtistClick.bind(this);
        this.renderEditArtistForm = this.renderEditArtistForm.bind(this);
        this.handleCancelEditClick = this.handleCancelEditClick.bind(this);
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
        this.setState({creatingNewArtist: true, editingCurrentArtist: false});
    }

    handleCancelFormClick() {
        this.setState({creatingNewArtist: false});
    }

    handleEditCurrentArtistClick() {
        this.setState({editingCurrentArtist: true, creatingNewArtist: false});
    }

    handleCancelEditClick() {
        this.setState({editingCurrentArtist: false});
    }

    renderNewArtistForm() {
        if (this.state.creatingNewArtist) {
            return <CreateArtistForm handleCancel={this.handleCancelFormClick}/>;
        }
    }

    renderEditArtistForm() {
        if (this.state.editingCurrentArtist) {
            return <EditArtistForm artist={this.state.currentArtist} handleCancel={this.handleCancelEditClick}/>;
        }
    }

    render() {
        return (
            <div className="row content-row">
                <ListItemContainer type={'artist'} 
                                   data={this.state.artists} 
                                   handleLinkClick={this.handleArtistLinkClick} 
                                   handleButtonClick={this.handleCreateNewArtistClick}/>
                <ArtistDetails artist={this.state.currentArtist} handleEdit={this.handleEditCurrentArtistClick}/>
                {this.renderNewArtistForm()}
                {this.renderEditArtistForm()}
            </div>            
        );
    }
}

export default ArtistContentContainer;