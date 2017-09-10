import React from 'react';

class ListItem extends React.Component {
    render() {
        return (
            <li><a href={this.props.url}>{this.props.name}</a></li>
        );
    }
}

export default ListItem;