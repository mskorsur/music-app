import React from 'react';
import ListItem from './ListItem';

class ListItemContainer extends React.Component {
    render() {
        return (
            <div className="one-third column content-column">
            <h4>List of {this.props.type}s</h4>
            <ul>
                {this.props.data.map(item => {
                    return <ListItem key={item.id} url={item.url} name={item.name}/>;
                })}
            </ul>
            <button>Create new</button>
          </div>
        );
    }
}

export default ListItemContainer;