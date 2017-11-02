import React, { Component } from 'react';
import EventService from './EventService';
import Event from './Event';

class EventList extends Component {

	events = ['popular', 'horse-racing', 'basketball'];

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.pushEvents();
	}

	pushEvents() {
		this.events.forEach((e)=>{
			EventService.getEvents(e).then((data) => {
				this.setState((()=>{
						let s = {};
						s[e] = data;
						return s
					})());
			});
		});
	}

	render() {

		var elems = [];

		this.events.forEach((e, i) => {
			let subElems = [];
			if(this.state[e]) {
				subElems.push(<h1 key={e + '_header'}> {e} </h1>);
				for(let ev in this.state[e].events) {
					subElems.push(<Event eventId={this.state[e].events[ev].id} name={this.state[e].events[ev].name} key={this.state[e].events[ev].id} />)
				}
			}
			else {
				subElems.push(<div key={e + '_header'}> <h1>{e}</h1> <p>Loading...</p> </div>);
			}
		elems.push(<div key={e}>{subElems}</div>)
		});
		return elems
	}
}

export default EventList;
