import React from "react"

export default class PostStatusFilter extends React.Component {
    constructor(props) {
        super();
        this.buttons = [
            {name: 'all', lebel: 'All'},
            {name: 'like', lebel: 'Liked'}
        ]
    }
    render() {
        const buttons = this.buttons.map(({name, lebel}) => {
            const active = this.props.filter === name;
            const clazz = active ? 'btn-info' : 'btn-outline-secondary';
            return (
                <button 
                    key={name} 
                    type="button" 
                    className={`btn ${clazz}`}
                    onClick={() => this.props.onFilterSelect(name)}
                    >
                    {lebel}
                </button>
            )
        })
        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    }
}
