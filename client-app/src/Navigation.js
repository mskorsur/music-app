import React from 'react';

class Navigation extends React.Component {
    render() {
        return (
            <div className="row">
            <div className="six columns">
              <a className="button button-primary padded-button" href="#">Artists</a>
              <a className="button button-primary padded-button" href="#">Albums</a>
            </div>
      
            <div className="six columns"></div>
          </div>
        );
    }
}

export default Navigation
