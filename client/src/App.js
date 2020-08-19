import React, { Component } from 'react';
import Axios from 'axios';
import ParticlesBg from 'particles-bg';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			message: null,
		};
	}
	render() {
		Axios({
			method: 'GET',
			url: 'http://localhost:5000/',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => {
			this.setState({ message: res.data.message });
		});
		return (
			<>
				<Row>
					<Col>
						<Card>
							<Card.Body>{this.state.message}</Card.Body>
						</Card>
					</Col>
				</Row>
				<ParticlesBg color='#ff0000' num={5} type='circle' bg={true} />
			</>
		);
	}
}
