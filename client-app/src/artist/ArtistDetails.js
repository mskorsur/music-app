import React from 'react';

class ArtistDetails extends React.Component {
  constructor(props) {
    super(props);

    this.renderAlbums = this.renderAlbums.bind(this);
    this.renderArtistDetails = this.renderArtistDetails.bind(this);
    this.handleEditArtistDetails = this.handleEditArtistDetails.bind(this);
  }

  handleEditArtistDetails() {
    //editing can be done only if a user selected an artist
    if (this.props.artist.name !== '') {
      this.props.handleEdit();
    }
  }

  renderArtistDetails(artist) {
    return (
      <ul>
        <li><strong>Name:</strong> {artist.name}</li>
        <li><strong>Date of birth:</strong> {artist.dateOfBirth}</li>
        {this.renderAlbums(artist.albums)}
      </ul>
    );
  }

  renderAlbums(albums) {
    return (
      <li>
        <strong>Albums:</strong>
        <ul>
          {albums.map((album, index) => {
            return <li key={album.id}>{album.name}</li>
          })}
        </ul>
      </li>
    );
  }
  
   render() {
        return (
            <div className="one-third column content-column">
            <h4>Artist details</h4> 
             {this.renderArtistDetails(this.props.artist)}
            <button onClick={this.handleEditArtistDetails}>Edit</button>
          </div>
        );
    }
}

export default ArtistDetails;