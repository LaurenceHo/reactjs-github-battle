import * as React from 'react';
import { Link } from 'react-router-dom';
import { PlayerPreview } from './playerReview';

interface PlayerInputProps {
	id: string,
	label: string,
	onSubmit: any
}

interface PlayerInputState {
	username: string
}

class PlayerInput extends React.Component<PlayerInputProps, PlayerInputState> {
	constructor(props: PlayerInputProps) {
		super(props);

		this.state = {
			username: ''
		};
	}

	handleChange = (event: any) => {
		const value = event.target.value;

		this.setState(() => {
			return {
				username: value
			}
		})
	};

	handleSubmit = (event: any) => {
		event.preventDefault();

		this.props.onSubmit(
			this.props.id,
			this.state.username
		);
	};

	render() {
		return (
			<form className='column' onSubmit={this.handleSubmit}>
				<label className='header' htmlFor='username'>
					{this.props.label}
				</label>

				<input
					id='username'
					placeholder='github username'
					type='text'
					autoComplete='off'
					value={this.state.username}
					onChange={this.handleChange}
				/>

				<button className='button' type='submit' disabled={!this.state.username}>Submit</button>
			</form>
		);
	}
}

interface BattleProps {
	match?: any,
}

export class Battle extends React.Component<BattleProps, any> {
	constructor(props: BattleProps) {
		super(props);

		this.state = {
			playerOneName: '',
			playerTwoName: '',
			playerOneImage: null,
			playerTwoImage: null
		};
	}

	handleSubmit = (id: string, username: string) => {
		this.setState(() => {
			const newState: any = {};
			newState[id + 'Name'] = username;
			newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
			return newState;
		});
	};

	handleReset = (id: string) => {
		this.setState(() => {
			const newState: any = {};
			newState[id + 'Name'] = '';
			newState[id + 'Image'] = null;
			return newState;
		});
	};

	render() {
		const match = this.props.match;
		const { playerOneName, playerTwoName, playerOneImage, playerTwoImage } = this.state;

		return (
			<div>
				<div className='row'>
					{!playerOneName &&
					<PlayerInput
						id='playerOne'
						label='Player One'
						onSubmit={this.handleSubmit}/>}
					{playerOneImage !== null &&
					<PlayerPreview
						avatar={playerOneImage}
						username={playerOneName}>
						<button
							className='reset'
							onClick={() => this.handleReset('playerOne')}>
							Reset
						</button>
					</PlayerPreview>}
					{!playerTwoName &&
					<PlayerInput
						id='playerTwo'
						label='Player Two'
						onSubmit={this.handleSubmit}/>}
					{playerTwoImage !== null &&
					<PlayerPreview
						avatar={playerTwoImage}
						username={playerTwoName}>
						<button
							className='reset'
							onClick={() => this.handleReset('playerTWo')}>
							Reset
						</button>
					</PlayerPreview>}
				</div>
				{playerOneImage && playerTwoImage &&
				<Link
					className='button'
					to={{
						pathname: match.url + '/results',
						search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
					}}>
					Battle!
				</Link>}
			</div>
		);
	}
}
