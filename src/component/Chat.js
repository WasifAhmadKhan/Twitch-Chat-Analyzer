import React, { Component } from 'react'

export default class chat extends Component {
    render() {
        let {msg} = this.props;
        return (
            <div>
                  {msg.map((message,i)=>(
                            <li className=" list-group-item list-group-item-dark" key={i}><b>{message.tgs['display-name']} : </b> {message.body}</li>
                    ))}
            </div>
        )
    }
}
