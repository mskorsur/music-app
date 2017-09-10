import React from 'react';

class DetailsContainer extends React.Component {
    render() {
        return (
            <div className="one-third column content-column">
            <h4>Artist details</h4> 
            <ul>
              <li>Lady Gaga</li>
              <li>
                Albums
                <ul>
                  <li>The Fame Monster</li>
                  <li>Joanne</li>
                </ul>
              </li>
              <li>28-3-1986</li>
            </ul>
            <button>Edit</button>
          </div>
        );
    }
}

export default DetailsContainer;