import React from 'react'
import './PostAddForm.css'

export default class PostAddForm extends React.Component {
    constructor() {
        super();
        this.state = {
            text: ''
        }

        this.onValueChange = this.onValueChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onValueChange(e) {
        this.setState({
            text: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state.text)
        this.setState({
            text: ''
        })
    }

    render() {
        return (
            <form className="bottom-panel d-flex" onSubmit={this.onSubmit}>
                <input 
                    type="text"
                    placeholder="What are yuo thinking about?"
                    className="form-control new-post-lebel"
                    onChange={this.onValueChange}
                    value={this.state.text}
                />
                <button 
                    type="submit" 
                    className="btn btn-outline-secondary"
                    >
                    Add Post
                </button>
            </form>
        )
    }
    
}

