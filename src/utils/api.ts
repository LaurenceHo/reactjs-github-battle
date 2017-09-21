import axios from 'axios';

const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile(username: any) {
	return axios.get('https://api.github.com/users/' + username + params)
		.then((user) => {
			return user.data;
		});
}

function getRepos(username: any) {
	return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100');
}

function getStarCount(repos: any) {
	return repos.data.reduce((count: any, repo: any) => {
		return count + repo.stargazers_count
	}, 0);
}

function calculateScore(profile: any, repos: any) {
	const followers = profile.followers;
	const totalStars = getStarCount(repos);

	return (followers * 3) + totalStars;
}

function handleError(error: any): any {
	console.warn(error);
	return null;
}

function getUserData(player: any) {
	return axios.all([
		getProfile(player),
		getRepos(player)
	]).then((data) => {
		const profile = data[0];
		const repos = data[1];

		return {
			profile: profile,
			score: calculateScore(profile, repos)
		}
	});
}

function sortPlayers(players: any) {
	return players.sort((a: any, b: any) => {
		return b.score - a.score;
	});
}

export const Battle = (players: any) => {
	return axios.all(players.map(getUserData))
		.then(sortPlayers)
		.catch(handleError);
};

export const FetchPopularRepos = (language: any) => {
	const encodedURI = encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

	return axios.get(encodedURI)
		.then((response) => {
			return response.data.items;
		});
};