import React, { Component } from 'react';

class EventService extends Component {

	eventsBody = {};

	static corsUrl = 'https://cors-anywhere.herokuapp.com/';

	static getEvents(sport) {
		let baseUrl = sport === 'popular' ? 'https://fe-api.smarkets.com/v0/events/' : 'https://smarkets.com/v0/listings/slug/sport/';
		return new Promise((resolve, reject) => {
			window.fetch(this.corsUrl + baseUrl + sport + '/?period=upcoming').then((r) => {
				if(r.status !== 200){
					console.log("Can't reach API! Error code: " + r.status + " At: " + baseUrl + sport + '/?period=upcoming')
					reject({});
				}
				r.json().then((data) => {
					if(sport === 'popular') {
						data.events = data.results;
					}
					resolve(data);
				})
			})
		})
	}

	static getEvent(id) {
		let baseUrl = 'https://fe-api.smarkets.com/v0/events/id/'
		return new Promise((resolve, reject) => {
			window.fetch(this.corsUrl + baseUrl + id).then((r) => {
				if(r.status !== 200){
					console.log("Can't reach API! Error code: " + r.status + " At: " + baseUrl + id)
					reject({});
				}
				r.json().then((data) => {
					resolve(data);
				})
			})
		})
	}

}

export default EventService;