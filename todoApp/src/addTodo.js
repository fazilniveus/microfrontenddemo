import React from 'react';

export class AddTodo extends React.Component {

    constructor(props) {
        super(props);
        this.addTodo = this.addTodo.bind(this);
    }

    addTodo() {
        this.props.addTodo(this.description.value);
        this.description.value = '';
    }

    render() {
        return (
            <div>
                <hr></hr>
                <h1 style={{color:'red'}}>Todo MF</h1>
                <label>Add Todo Object</label>
                <input type='Text' placeholder="Enter Todo" ref={node => {
                    this.description = node;
                }}></input>
                <button onClick={this.addTodo}>Submit</button>
            </div>
        )
    }
}