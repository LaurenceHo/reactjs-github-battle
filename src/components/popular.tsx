import * as React from 'react';
import { FetchPopularRepos } from '../utils/api';
import { Loading } from './loading';

interface PopularState {
	selectedLanguage: any,
	repos: any
}

export class Popular extends React.Component<any, PopularState> {
	constructor(props: any) {
		super(props);
		this.state = {
			selectedLanguage: 'All',
			repos: null
		};

		this.updateLanguage = this.updateLanguage.bind(this);
	}

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage(lang: string) {
		this.setState(() => {
			return {
				selectedLanguage: lang,
				repos: null
			}
		});

		FetchPopularRepos(lang)
			.then(function (repos: string) {
				this.setState(() => {
					return {
						repos: repos
					}
				});
			}.bind(this));
	}

	render() {
		return (
			<div>
				<SelectLanguage
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage}
				/>
				{!this.state.repos ? <Loading/> : <RepoGrid repos={this.state.repos}/>}
			</div>
		);
	}
}

// Stateless Functional Components
const SelectLanguage = (props: SelectLanguageProps) => {
	const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

	return (
		<ul className='languages'>
			{languages.map((lang) => {
				return (
					<li
						style={lang === props.selectedLanguage ? {color: 'red'} : null}
						onClick={props.onSelect.bind(null, lang)}
						key={lang}>
						{lang}
					</li>
				)
			}, this)}
		</ul>
	)
};

interface SelectLanguageProps {
	selectedLanguage: string,
	onSelect: any
};

interface RepoGridProps {
	repos: any[]
}

const RepoGrid = (props: RepoGridProps) => {
	return (
		<ul className='popular-list'>
			{props.repos.map((repo, index) => {
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