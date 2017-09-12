import React from 'react';

class ArtistDetails extends React.Component {
  constructor(props) {
    super(props);

    this.renderAlbums = this.renderAlbums.bind(this);
    this.renderArtistDetails = this.renderArtistDetails.bind(this);
  }

  renderArtistDetails(artist) {
    return (
      <ul>
        <li><strong>Name:</strong> {artist.name}</li>
        <li><strong>Date of birth:</strong> {artist.dob}</li>
        {this.renderAlbums(artist.albums)}
      </ul>
    );
  }

  renderAlbums(albums) {
    return (
      <li>
        <strong>Albums:</strong>
        <ul>
          {albums.map(album => {
            return <li>{album}</li>
          })}
        </ul>
      </li>
    );
  }
  
   render() {
        return (
            <div className="one-third column content-column">
            <h4>Artist details</h4> 
             {this.renderArtistDetails(this.props.data)}
            <button>Edit</button>
          </div>
        );
    }
}

export default ArtistDetails;