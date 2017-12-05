import React from 'react';
import axios from 'axios';

import GenreFormItem from './GenreFormItem';

class CreateAlbumForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            artist: '',
            genres: [],
            releaseDate: new Date(),
            created: false,
            creationMessage: '',
            apiArtists: [],
            apiGenres: []
        };

        this._genreHelper = [];

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleArtistChange = this.handleArtistChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleReleaseDateChange = this.handleReleaseDateChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.convertGenreArrayToString = this.convertGenreArrayToString.bind(this);
        this.renderArtistSelect = this.renderArtistSelect.bind(this);
        this.renderGenreCheckboxes = this.renderGenreCheckboxes.bind(this);
        this.renderCreationMessage = this.renderCreationMessage.bind(this);
        this.setGenresToState = this.setGenresToState.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3030/api/artist/list')
            .then(response => {
                this.setState({apiArtists: response.data});
            });

        axios.get('http://localhost:3030/api/genre/list')
            .then(response => {
                this.setState({apiGenres: response.data});
            });
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleArtistChange(event) {
        this.setState({artist: event.target.value});
    }

    handleGenreChange(genreId, isChecked) {
        if (isChecked) {
            let genres = [...this._genreHelper, genreId];
            this._genreHelper = [...genres];
        }
        else { //!isChecked
            let genres = [...this._genreHelper];
            let genreToBeRemovedIndex = genres.indexOf(genreId);
            genres.splice(genreToBeRemovedIndex, 1);
            this._genreHelper = genres;

        }
    }

    setGenresToState() {
        this.setState({
            genres: this._genreHelper
        });
    }

    handleReleaseDateChange(event) {
        this.setState({releaseDate: event.target.value});
    }

    convertGenreArrayToString(genres) {
        return genres.join(',');
    }

    handleFormSubmit(event) {
        event.preventDefault();

        axios.post('http://localhost:3030/api/album/create', {
            name: this.state.name,
            artist: this.state.artist,
            genre: this.convertGenreArrayToString(this.state.genres),
            releaseDate: this.state.releaseDate
        })
        .then(response => {
            this.setState({created: true, creationMessage: response.data.message});
        });
    }

    renderArtistSelect() {
        return (
            <select value={this.state.artist} onChange={this.handleArtistChange}>
            {this.state.apiArtists.map(artist => {
                return <option key={artist.id} value={artist.id}>{artist.name}</option>;
            })}
            </select>
        );
    }

    renderGenreCheckboxes() {
        return (
            <label>
                Genres:
                {this.state.apiGenres.map(genre => {
                    return <GenreFormItem key={genre.id} genre={genre} checked={false} handleCheck={this.handleGenreChange} />
                })}
            </label>  
        );
    }

    renderCreationMessage() {
        if (this.state.created) {
            return <p>{this.state.creationMessage}</p>;
        }
    }

    render() {
        return (
            <div className="one-third column content-column">
            <h4>Create a new album</h4>
            <form onSubmit={this.handleFormSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <label>
                    Artist:
                    {this.renderArtistSelect()}
                </label>
                {this.renderGenreCheckboxes()}
                <label>
                    Release date:
                    <input type="date" value={this.state.releaseDate} onChange={this.handleReleaseDateChange} />
                </label>

                <input type="submit" value="Submit" className="padding-right"/>
                <button onClick={this.props.handleCancel}>Cancel</button>
            </form>
            {this.renderCreationMessage()}
          </div>
        );
    }
}

export default CreateAlbumForm;