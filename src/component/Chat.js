import React, { Component } from 'react'

export default class chat extends Component {
    render() {
        let {msg,subscriber} = this.props;
   
        return (
            <div>
                  {subscriber===true?msg.filter((message)=>message.tgs['subscriber']===true).map((message,i)=>(
                            <li className=" list-group-item list-group-item-dark"  key={i}><b><span style={{color:message.tgs['color']}}>{message.tgs['display-name']} :</span> </b> {message.body}</li>
                    )):msg.map((message,i)=>(
                            <li className=" list-group-item list-group-item-dark"  key={i}><b><span style={{color:message.tgs['color']}}>{message.tgs['display-name']} :</span> </b> {message.body}</li>
                    ))}
                  
            </div>
        )
    }
}
