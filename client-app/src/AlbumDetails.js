import React from 'react';

class AlbumDetails extends React.Component {
    constructor(props) {
        super(props);

        this.renderGenres = this.renderGenres.bind(this);
        this.renderAlbumDetails = this.renderAlbumDetails.bind(this);
    }

    renderAlbumDetails(album) {
        return (
            <ul>
              <li><strong>Name:</strong> {album.name}</li>
              <li><strong>Artist:</strong> {album.artist}</li>
              <li><strong>Release date:</strong> {album.releaseDate}</li>
              {this.renderGenres(album.genre)}
            </ul>
          );
    }

    renderGenres(genres) {
        return (
          <li>
            <strong>Genres:</strong>
            <ul>
              {genres.map(genre => {
                return <li>{genre}</li>
              })}
            </ul>
          </li>
        );
      }

    render() {
        return (
            <div className="one-third column content-column">
            <h4>Album details</h4> 
             {this.renderAlbumDetails(this.props.data)}
            <button>Edit</button>
          </div>
        );
    }
}

export default AlbumDetails