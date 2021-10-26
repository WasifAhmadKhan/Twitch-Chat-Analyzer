import React, { Component } from 'react'
import Chat from './component/Chat';
import Poll from './component/Poll';
import Users from './component/Users';
const tmi = require('tmi.js');
export default class Twich extends Component {
    client = new tmi.Client();

    constructor() {
        super();


        this.state = {
            msg: [],
            startpoll: false,
            channel: "",
            msgCount: {},
            subscriber: false,
            userCount: {},
        }
    }
    startFetch = async () => {
        this.client.channels = [this.state.channel];
        this.client.connect();
        this.client.on('message', (channel, tags, message, self) => {
            typeof this.state.userCount[tags['display-name']] === 'undefined' ?this.state.userCount[tags['display-name']] = 1 : this.state.userCount[tags['display-name']]++;
            this.setState(
                {
                    msg: [...this.state.msg, { body: message, tgs: tags }],

                }
            )
            //console.log(tags);
            //console.log(this.state.userCount);
            if (this.state.startpoll) {
                if(this.state.subscriber===true){
                    if(tags['subscriber']===true){
                        typeof this.state.msgCount[message] === 'undefined' ? this.state.msgCount[message] = 1 : this.state.msgCount[message]++;
                    }
                }else{
                    typeof this.state.msgCount[message] === 'undefined' ? this.state.msgCount[message] = 1 : this.state.msgCount[message]++;
                }
            }

        });
    }
    stopFetch = async () => {

        this.client.disconnect();
        this.state.msgCount = {};
        this.state.userCount = {};
        this.setState(
            {
                msg: [],
            }
        )
    }
    startPoll = async () => {

        this.setState(
            {
                startpoll: true,
            }
        )
    }
    stoptPoll = async () => {
        this.setState(
            {
                startpoll: false,
            }
        )
    }
    resetPoll = async () => {
        this.state.msgCount = {};
    }
    handleChange = async (event) => {
        this.setState(
            {
                channel: event.target.value,
            }
        )

    }
    toggleSub = async()=>{
        if(this.state.subscriber===false){
            this.setState(
                {
                    subscriber:true,
                    msg:[]
                }
            )
            this.state.msgCount={};
        }
        else{
            this.setState(
                {
                    subscriber:false,
                    msg:[]
                }
            )
            this.state.msgCount={};
        }
    }
    componentDidUpdate() {
        this.node.scrollTop = this.node.scrollHeight;
    }
    render() {
        const mystyle = {
            height: "350px",
            width: "400px",
            overflow: "scroll",
            backgroundColor: "grey",


        }

        return (
            <div>
                <input className="form-control my-2 mx-3" type="search" placeholder="Search" aria-label="Search" onChange={this.handleChange} style={{ width: "200px" }} />
                <button disabled={this.state.channel === "" ? true : false} type="button" className="btn btn-dark mx-3 " onClick={this.startFetch}>Start</button>
                <button disabled={this.state.channel !== "" ? false : true} type="button" className="btn btn-dark" onClick={this.stopFetch}>Stop</button>
                <div className="form-check form-switch my-2 mx-3">
                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={this.toggleSub}/>
                    <label className ="form-check-label text-light" htmlFor="flexSwitchCheckDefault" >{this.state.subscriber?"Disable Subscriber Only":"Enable Subscriber Only"}</label>
                </div>
                <div className="container  mb-2 ">
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <button disabled={this.state.startpoll || this.state.channel === ""} type="button" className="btn btn-dark" onClick={this.startPoll}>Start Poll</button>&nbsp
                                <button disabled={!this.state.startpoll || this.state.channel === ""} type="button" className="btn btn-dark" onClick={this.stoptPoll}>Stop Poll</button>&nbsp
                                <button type="button" className="btn btn-dark" onClick={this.resetPoll}>Reset Poll</button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                <b className ="form-check-label text-light"> Most active user</b>
                </div>
                <div className="container my-3 mx-3 " >
                    <div className="row" >
                        <ul className="col-md-4 card list-group" ref={(node) => (this.node = node)} style={mystyle}>
                            <Chat msg={this.state.msg} subscriber={this.state.subscriber} />
                        </ul>
                        <div className="col-md-4 " >
                            
                            <Poll msgCount={this.state.msgCount} />
                        </div>
                        <div className="col-md-3 mx-4 " >
                            <Users userCount={this.state.userCount} />
                        </div>
                    </div>

                </div>



            </div>
        )
    }
}
