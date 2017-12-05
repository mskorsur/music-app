import React from 'react';

class GenreFormItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: this.props.checked
        }

        this.handleCheckChange = this.handleCheckChange.bind(this);
    }

    handleCheckChange(event) {
        this.setState(prevState => ({
            isChecked: !prevState.isChecked
        }));

        this.props.handleCheck(event.target.id, !this.state.isChecked);
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