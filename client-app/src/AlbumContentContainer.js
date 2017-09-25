import React from 'react';
import axios from 'axios';

import ListItemContainer from './ListItemContainer';
import AlbumDetails from './AlbumDetails';
import CreateAlbumForm from './CreateAlbumForm';

class AlbumContentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            albums: [],
            currentAlbum: {name: '', artist: '', genre: []},
            creatingNewAlbum: false
        };

        this.handleAlbumLinkClick = this.handleAlbumLinkClick.bind(this);
        this.handleCreateNewAlbumClick = this.handleCreateNewAlbumClick.bind(this);
        this.renderNewAlbumForm = this.renderNewAlbumForm.bind(this);
        this.handleCancelFormClick = this.handleCancelFormClick.bind(this);
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

    handleCreateNewAlbumClick() {
        this.setState({creatingNewAlbum: true});
    }

    handleCancelFormClick() {
        this.setState({creatingNewAlbum: false});
    }

    renderNewAlbumForm() {
        if (this.state.creatingNewAlbum) {
            return <CreateAlbumForm handleCancel={this.handleCancelFormClick}/>;
        }
    }

    render() {
        return (
            <div className="row content-row">
                <ListItemContainer type={'album'} 
                                   data={this.state.albums} 
                                   handleLinkClick={this.handleAlbumLinkClick}
                                   handleButtonClick={this.handleCreateNewAlbumClick}/>
                <AlbumDetails data={this.state.currentAlbum}/>
                {this.renderNewAlbumForm()}
            </div>
        );
    }
}

export default AlbumContentContainer;