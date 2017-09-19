import React from 'react';

class ListItem extends React.Component {
    render() {
        return (
            <li>
                <a href={this.props.id} id={this.props.id} onClick={this.props.handleLinkClick}>
                    {this.props.name}
                </a>
            </li>
        );
    }
}

export default ListItem;