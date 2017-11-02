import React, { Component } from 'react';
import EventService from './EventService';
import './Event.css'

class Event extends Component {

	constructor(props) {
		super(props)
		this.state = {showDetails: false, loading: false};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.pushDetails();
	}

	pushDetails() {
		if(!this.state.details) {
			this.setState({loading: !this.state.loading})
			EventService.getEvent(this.props.eventId).then((details) => {
				this.setState({showDetails: !this.state.showDetails, details: details, loading: !this.state.loading});
			})
		}
		else {
				this.setState({showDetails: !this.state.showDetails});
		}
		
	}

	render() {

		let elems = [];

		elems.push(<div key={this.props.eventId + '_header'} onClick={this.handleClick} className="listElement">{this.props.name}</div>);

		if(this.state.loading) {
			elems.push(<div key={this.props.eventId + '_loading'}>Loading...</div>);
		}

		if(this.state.showDetails) {
			elems.push(<ul className="eventList" key={this.props.eventId + '_details'}>
				<li><h4>Details:</h4></li>
				<li>{this.state.details.event.parent_name}</li>
				<li>{this.state.details.event.start_datetime}</li>
				<li><h4>Types of bets:</h4></li>
				{Object.keys(this.state.details.contract_groups).map((cg) => {
					return <li>{this.state.details.contract_groups[cg].name}</li>
				})}
				</ul>);

		}

		return <div key={this.props.eventId}>{elems}</div>;
	}
}

export default Event;
