import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';

export class Popular extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
			selectedLanguage: 'All',
			repos: null
		};

		this.updateLanguage = this.updateLanguage.bind (this);
	}

	componentDidMount () {
		this.updateLanguage (this.state.selectedLanguage);
	}

	updateLanguage (lang) {
		this.setState (() => {
			return {
				selectedLanguage: lang,
				repos: null
			}
		});

		fetchPopularRepos (lang)
			.then (function (repos) {
				this.setState (() => {
					return {
						repos: repos
					}
				});
			}.bind (this));
	}

	render () {
		return (
			<div>
				<SelectLanguage
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage}
				/>
				{!this.state.repos ? <p>LOADING...</p> : <RepoGrid repos={this.state.repos}/>}
			</div>
		);
	}
}

// Stateless Functional Components
const SelectLanguage = (props) => {
	const languages = [ 'All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python' ];

	return (
		<ul className='languages'>
			{languages.map ((lang) => {
				return (
					<li
						style={lang === props.selectedLanguage ? { color: 'red' } : null}
						onClick={props.onSelect.bind (null, lang)}
						key={lang}>
						{lang}
					</li>
				)
			}, this)}
		</ul>
	)
};

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired
};

const RepoGrid = (props) => {
	return (
		<ul className='popular-list'>
			{props.repos.map ((repo, index) => {
				return (
					<li key={repo.name} className='popular-item'>
						<div className='popular-rank'>#{index + 1}</div>
						<ul className='space-list-items'>
							<li>
								<img
									className='avatar'
									src={repo.owner.avatar_url}
									alt={'Avatar for ' + repo.owner.login}
								/>
							</li>
							<li><a href={repo.html_url}></a></li>
							<li>@{repo.owner.login}</li>
							<li>{repo.stargazers_count} stars</li>
						</ul>
					</li>
				)
			})}
		</ul>
	)
};

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired
};
