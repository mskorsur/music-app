import React from 'react';
import axios from 'axios';

class CreateArtistForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            dateOfBirth: new Date(),
            created: false,
            creationMessage: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDOBChange = this.handleDOBChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.renderCreationMessage = this.renderCreationMessage.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    handleDOBChange(event) {
        this.setState({dateOfBirth: event.target.value});
    }

    handleFormSubmit(event) {
        event.preventDefault();

        axios.post('http://localhost:3030/api/artist/create', {
            name: this.state.name,
            dateOfBirth: this.state.dateOfBirth
        })
        .then(response => {
            this.setState({created: true, creationMessage: response.data.message});
        });
    
    }

    renderCreationMessage() {
        if (this.state.created) {
            return <p>{this.state.creationMessage}</p>;
        }
    }

    render() {
        return (
            <div className="one-third column content-column">
            <h4>Create a new artist</h4>
            <form onSubmit={this.handleFormSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <label>
                    Date of Birth:
                    <input type="date" value={this.state.dateOfBirth} onChange={this.handleDOBChange} />
                </label>

                <input type="submit" value="Submit" className="padding-right"/>
                <button onClick={this.props.handleCancel}>Cancel</button>
            </form>
            {this.renderCreationMessage()}
          </div>
        );
    }
}

export default CreateArtistForm;