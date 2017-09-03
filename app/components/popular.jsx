import React from 'react';

export class Popular extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
			selectedLanguage: 'All'
		};

		this.updateLanguage = this.updateLanguage.bind (this);
	}

	updateLanguage (lang) {
		this.setState (() => {
			return {
				selectedLanguage: lang
			}
		})
	}

	render () {
		const language = [ 'All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python' ];
		return (
      <ul className='languages'>
				{language.map ((lang) => {
					return (
            <li
              style={lang === this.state.selectedLanguage ? { color: 'red' } : null}
              onClick={this.updateLanguage.bind (null, lang)}
              key={lang}>
							{lang}
            </li>
					)
				}, this)}
      </ul>
		);
	}
}