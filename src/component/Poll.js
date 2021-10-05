import React, { Component } from 'react'

export default class Poll extends Component {

    render() {
        let {  msgCount } = this.props;
        const mystyle = {
            height: "350px",
            width: "400px",
            overflow: "scroll",
        }
        return (
            <div>
                    <ul className=" card list-group" style={mystyle}>
                        { Object.entries(msgCount).sort((a, b) => b[1] - a[1]).map((element, i) => {
                            return <li className=" list-group-item list-group-item-dark" key={i}><b>{element[1]} : </b> {element[0]}</li>
                        }).slice(0, 10)}
                    </ul>
            </div>
        )
    }
}
