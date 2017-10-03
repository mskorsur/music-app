import React from 'react';
import axios from 'axios';

class EditArtistForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.artist.name,
            dateOfBirth: new Date(),
            updated: false,
            updateMessage: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDOBChange = this.handleDOBChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.renderUpdateMessage = this.renderUpdateMessage.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleDOBChange(event) {
        this.setState({dateOfBirth: event.target.value});
    }

    handleFormSubmit(event) {
        event.preventDefault();

        let artistId = this.props.artist.id;
        axios.post(`http://localhost:3030/api/artist/${artistId}/update`, {
            name: this.state.name,
            dateOfBirth: this.state.dateOfBirth
        })
        .then(response => {
            this.setState({updated: true, updateMessage: response.data.message});
        });
    
    }

    renderUpdateMessage() {
        if (this.state.updated) {
            return <p>{this.state.updateMessage}</p>;
        }
    }

    render() {
        return (
            <div className="one-third column content-column">
            <h4>Edit current artist</h4>
            <form onSubmit={this.handleFormSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <label>
                    Date of Birth: ({this.props.artist.dateOfBirth})
                    <input type="date" value={this.state.dateOfBirth} onChange={this.handleDOBChange} />
                </label>

                <input type="submit" value="Submit" className="padding-right"/>
                <button onClick={this.props.handleCancel}>Cancel</button>
            </form>
            {this.renderUpdateMessage()}
          </div>
        );
    }
}

export default EditArtistForm;