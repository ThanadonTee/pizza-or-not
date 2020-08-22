import React, { Component } from 'react';
import Axios from 'axios';
import ParticlesBg from 'particles-bg';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/main.css';
import ImageUploader from 'react-images-upload';

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
			message: '',
		};
		this.onDrop = this.onDrop.bind(this);
	}

	onDrop(picture) {
		var image = new FormData();
		image.append('data', picture[0], 'data');
		Axios({
			method: 'POST',
			url: 'http://localhost:5000',
			data: image,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
			.then((res) => {
				console.log(res);
				this.setState({
					message: res.data.message,
				});
			})
			.catch((error) => {
				console.log(error);
				if (error.request) {
					this.setState({
						message:
							'There is an error on request with this message : \r\n' +
							error.message,
					});
				} else if (error.response) {
					this.setState({
						message:
							'There is an error on response with this message : \r\n' +
							error.response.data,
					});
				}
			});
	}

	render() {
		return (
			<>
				<Col>
					<Row>
						<ImageUploader
							withIcon={true}
							singleImage={true}
							withPreview={true}
							buttonText='Choose images'
							onChange={this.onDrop}
							imgExtension={['.jpg', '.gif', '.png', '.gif']}
							maxFileSize={5242880}
						/>
					</Row>
					{this.state.message && (
						<Row className='justify-content-center align-items-center'>
							<Card>
								<Card.Body>{this.state.message}</Card.Body>
							</Card>
						</Row>
					)}
				</Col>
				<ParticlesBg color='#ff0000' num={5} type='circle' bg={true} />
			</>
		);
	}
}
