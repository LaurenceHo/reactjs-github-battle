import * as React from 'react';

const styles = {
	content: {
		textAlign: 'center',
		fontSize: '35px'
	}
};

interface LoadingProps {
	text?: string,
	speed?: number
};

export class Loading extends React.Component<LoadingProps, any> {
	public static defaultProps: Partial<LoadingProps> = {
		text: 'LOADING...',
		speed: 300
	};

	constructor(props: LoadingProps) {
		super(props);

		this.state = {
			text: props.text
		};
	}

	interval: any = {};

	componentDidMount() {
		const stopper = this.props.text + '...';
		this.interval = window.setInterval(function () {
			if (this.state.text === stopper) {
				this.setState(() => {
					return {
						text: this.state.text
					}
				});
			} else {
				this.setState((prevState: any) => {
					return {
						text: prevState.text + '.'
					}
				});
			}
		}.bind(this), this.props.speed);
	}

	componentWillUnmount() {
		window.clearInterval(this.interval);
	}

	render() {
		return (
			<p style={styles.content}>
				{this.state.text}
			</p>
		);
	}
}