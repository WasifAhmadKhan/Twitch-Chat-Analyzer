import React, { Component } from 'react'

export default class Controls extends Component {
    render() {
        return (
            <div>
                <div className="container-fluid  ">
                    <center>
                    <input className="form-control my-2 mx-3" type="search" placeholder="Search" aria-label="Search"  style={{ width: "200px" }} />
                    <button  type="button" className="btn btn-dark mx-3 " >Start</button>
                    <button  type="button" className="btn btn-dark" >Stop</button>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <label className="form-check-label text-light" htmlFor="flexSwitchCheckDefault">Default switch checkbox input</label>
                    </div>
                    </center>
                </div>
               
            </div>
        )
    }
}
