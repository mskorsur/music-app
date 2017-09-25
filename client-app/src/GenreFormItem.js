import React from 'react';

class GenreFormItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: false
        }

        this.handleCheckChange = this.handleCheckChange.bind(this);
    }

    handleCheckChange(event) {
        this.setState({isChecked: true});

        this.props.handleCheck(event.target.id);
    }

    render() {
        return (
            <label>
                {this.props.genre.name}
                <input type="checkbox" 
                       className="padding-left"
                       checked={this.state.isChecked}
                       id={this.props.genre.id}
                       onChange={this.handleCheckChange} />
            </label>
        );
    }
}

export default GenreFormItem;