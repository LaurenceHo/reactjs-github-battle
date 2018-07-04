import * as React from 'react';

interface LoadingProps {
	text?: string,
	speed?: number
}

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
		this.interval = window.setInterval(() => {
			this.state.text === stopper
				? this.setState(() => {
					return {
						text: this.state.text
					}
				})
				: this.setState((prevState: any) => {
					return {
						text: prevState.text + '.'
					}
				});
		}, this.props.speed);
	}

	componentWillUnmount() {
		window.clearInterval(this.interval);
	}

	render() {
		return (
			<p className='loadingWording'>
				{this.state.text}
			</p>
		);
	}
}
