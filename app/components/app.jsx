import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Popular } from './popular';
import { Nav } from './nav';
import { Home } from './home'
import { Battle } from './battle';

export class App extends React.Component {
	render () {
		return (
			<Router>
				<div className='container'>
					<Nav/>
					<Switch>
						<Route exact path='/' component={Home}/>
						<Route exact path='/popular' component={Popular}/>
						<Route path='/battle' component={Battle}/>
						<Route render={()=>{
							return <p> Not found!!</p>
						}} />
					</Switch>
				</div>
			</Router>
		);
	}
}