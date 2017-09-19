import React from 'react';
import ListItem from './ListItem';

class ListItemContainer extends React.Component {
    render() {
        return (
            <div className="one-third column content-column">
            <h4>List of {this.props.type}s</h4>
            <ul>
                {this.props.data.map(item => {
                    return <ListItem key={item.id} 
                                     id={item.id} 
                                     name={item.name} 
                                     handleLinkClick={this.props.handleLinkClick} />;
                })}
            </ul>
            <button onClick={this.props.handleButtonClick}>Create new</button>
          </div>
        );
    }
}

export default ListItemContainer;