import React, { Component } from "react";
import Axios from "axios";
import ParticlesBg from "particles-bg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/main.css";
import ImageUploader from "react-images-upload";

export default class App extends Component {
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		message: null,
	// 	};
	// }

	constructor(props) {
		super(props);
		this.state = {
			message: null,
		};
		this.state = { pictures: [] };
		this.onDrop = this.onDrop.bind(this);
	}

	onDrop(picture) {
		this.setState({
			pictures: this.state.pictures.concat(picture),
		});
	}

	render() {
		
		Axios({
			method: "GET",
			url: "http://localhost:5000/",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			this.setState({ message: res.data.message });
		});
		return (
			<>
				<Row>
					<ImageUploader
						withIcon={true}
						buttonText="Choose images"
						onChange={this.onDrop}
						imgExtension={[".jpg", ".gif", ".png", ".gif"]}
						maxFileSize={5242880}
					/>
				</Row>
				<Row>
					<Col>
						<Card>
							<Card.Body>{this.state.message}</Card.Body>
						</Card>
					</Col>
				</Row>
				<ParticlesBg color="#ff0000" num={5} type="circle" bg={true} />
			</>
		);
	}
}
