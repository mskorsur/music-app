import React from 'react';
import {Link} from 'react-router-dom';

class Navigation extends React.Component {
    render() {
        return (
            <div className="row">
            <div className="twelve columns">
              <Link to="/" className="button button-primary padded-button">Home</Link>
              <Link to="/artists" className="button button-primary padded-button">Artists</Link>
              <Link to="/albums" className="button button-primary padded-button">Albums</Link>
            </div>
          </div>
        );
    }
}

export default Navigation
