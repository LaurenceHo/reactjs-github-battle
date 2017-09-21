import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Popular } from './popular';
import { Nav } from './nav';
import { Home } from './home'
import { Battle } from './battle';
import { Results } from './results';

export class App extends React.Component<{}, {}> {
	render() {
		return (
			<Router>
				<div className='container'>
					<Nav/>
					<Switch>
						<Route exact path='/' component={Home as any}/>
						<Route exact path='/battle' component={Battle as any}/>
						<Route path='/battle/results' component={Results as any}/>
						<Route path='/popular' component={Popular as any}/>
						<Route render={() => {
							return <p> Not found!!</p>
						}}/>
					</Switch>
				</div>
			</Router>
		);
	}
}