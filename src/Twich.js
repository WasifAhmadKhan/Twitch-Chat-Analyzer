import React, { Component } from 'react'
import Chat from './component/Chat';
import Poll from './component/Poll';
const tmi = require('tmi.js');
export default class Twich extends Component {
    client = new tmi.Client();
    
    constructor() {
        super();


        this.state = {
            msg: [],
            startpoll: false,
            channel:"",
            msgCount : {},
        }
    }
    startFetch = async () => {
        this.client.channels=[this.state.channel];
        this.client.connect();
        this.client.on('message', (channel, tags, message, self) => {
            
            this.setState(
                {
                    msg: [...this.state.msg, { body: message, tgs: tags }],

                }
            )
            if(this.state.startpoll){
                typeof this.state.msgCount[message] === 'undefined' ? this.state.msgCount[message] = 1 : this.state.msgCount[message]++;
            }
         
        });
    }
    stopFetch = async () => {

        this.client.disconnect();
        this.state.msgCount = {};
        this.setState(
            {
                msg: [],
            }
        )
    }
    startPoll = async()=>{
        
        this.setState(
            {
                startpoll:true,
            }
        )
    }
    stoptPoll = async()=>{
        this.setState(
            {
                startpoll:false,
            }
        )
    }
    resetPoll = async()=>{
        this.state.msgCount={};
    }
    handleChange = async(event)=>{
        this.setState(
            {
                channel:event.target.value,
            }
        )

    }
    componentDidUpdate() {
        this.node.scrollTop = this.node.scrollHeight;
    }
    render() {
        const mystyle = {
            height: "350px",
            width: "400px",
            overflow: "scroll",
        }

        return (
            <div>
                <input className="form-control my-2 mx-3" type="search" placeholder="Search" aria-label="Search" onChange={this.handleChange} style={{width:"200px"}}/>
                <button disabled={this.state.channel===""?true:false} type="button" className="btn btn-dark mx-3 " onClick={this.startFetch}>Start</button>
                <button disabled={this.state.channel!==""?false:true} type="button" className="btn btn-dark" onClick={this.stopFetch}>Stop</button>
                <div className="container my-3 mx-3 " >
                    <div className="row" >
                        <ul className="col-md-4 card list-group" ref={(node) => (this.node = node)} style={mystyle}>
                            <Chat msg={this.state.msg} />
                        </ul>
                        <div className="col-md-4 " style={{ top: "-50px" }}>
                            <div className="row my-2" >
                                <div className="col"><button disabled={this.state.startpoll||this.state.channel===""} type="button" className="btn btn-dark   " onClick={this.startPoll}>Start Poll</button></div>
                                <div className="col"><button disabled={!this.state.startpoll||this.state.channel===""} type="button" className="btn btn-dark" onClick={this.stoptPoll}>Stop Poll</button></div>
                                <div className="col"><button type="button" className="btn btn-dark" onClick={this.resetPoll}>Reset Poll</button></div>
                            </div>
                            <Poll  msgCount={this.state.msgCount} />
                        </div>
                    </div>

                </div>



            </div>
        )
    }
}
