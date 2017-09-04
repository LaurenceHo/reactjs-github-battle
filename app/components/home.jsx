import React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.Component {
	render () {
		return (
			<div className='home-container'>
				<h1>Github battle!</h1>
				<Link className='button' to='/battle'>
					Battle
				</Link>
			</div>
		);
	}
}