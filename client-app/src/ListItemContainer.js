import React from 'react';
import ListItem from './ListItem';

class ListItemContainer extends React.Component {
    render() {
        return (
            <div className="one-third column content-column">
            <h4>List of {this.props.type}</h4>
            <ul>
                {this.props.artists.map(artist => {
                    return <ListItem key={artist.id} url={artist.url} name={artist.name}/>;
                })}
            </ul>
            <button>Create new</button>
          </div>
        );
    }
}

export default ListItemContainer;