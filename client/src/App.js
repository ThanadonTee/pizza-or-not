import React, { Component } from 'react';
import Axios from 'axios';
import ParticlesBg from 'particles-bg';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			loading: '',
			picture: '',
		};
		this.onDrop = this.onDrop.bind(this);
	}
	onDrop = (event) => {
		if (!event.target.files[0]) {
		} else {
			const selectedFile = event.target.files[0];
			this.setState(
				{
					loading: true,
					picture: URL.createObjectURL(selectedFile),
					message: '',
				},
				() => {
					var image = new FormData();
					image.append('data', selectedFile, 'data');
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
								loading: false,
							});
						})
						.catch((error) => {
							console.log(error);
							if (error.request) {
								this.setState({
									message:
										'There is an error on request with this message : \r\n' +
										error.message,
									loading: false,
								});
							} else if (error.response) {
								this.setState({
									message:
										'There is an error on response with this message : \r\n' +
										error.response.data,
									loading: false,
								});
							}
						});
				}
			);
		}
	};
	render() {
		return (
			<>
				<Col>
					<Row className='justify-content-center align-items-center'>
						<Col>
							<Row>
								<Col>
									{this.state.picture && (
										<Image
											src={this.state.picture}
											fluid
											style={{ height: '30vh' }}
										/>
									)}
								</Col>
							</Row>
							<Row>
								<Col>
									<Button variant='primary' size='lg'>
										<input
											type='file'
											name='file'
											accept='image/*'
											onChange={this.onDrop}
										/>
									</Button>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row className='justify-content-center align-items-center'>
						{(this.state.message || this.state.loading) && (
							<Card>
								{this.state.message && (
									<Card.Body>{this.state.message}</Card.Body>
								)}
								{this.state.loading && (
									<Card.Body>
										<Spinner animation='border' />
									</Card.Body>
								)}
							</Card>
						)}
					</Row>
				</Col>
				<ParticlesBg color='#ff0000' num={5} type='circle' bg={true} />
			</>
		);
	}
}
