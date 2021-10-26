import React, { Component } from 'react'

export default class Users extends Component {
    render() {
        let {  userCount } = this.props;
        const mystyle = {
            height: "350px",
            width: "400px",
            overflow: "scroll",
            backgroundColor : "grey"
        }
        return (
            <div>
            <ul className=" card list-group" style={mystyle}>
                { Object.entries(userCount).sort((a, b) => b[1] - a[1]).map((element, i) => {
                    return <li className=" list-group-item list-group-item-dark" key={i}>{element[0]}</li>
                }).slice(0, 5)}
            </ul>
    </div>
        )
    }
}
