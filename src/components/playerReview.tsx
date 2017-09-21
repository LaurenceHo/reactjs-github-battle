import * as React from 'react';

export const PlayerPreview = (props: any) => {
	return (
		<div>
			<div className='column'>
				<img
					className='avatar'
					src={props.avatar}
					alt={'Avatar for ' + props.username}
				/>
				<h2 className='username'>@{props.username}</h2>
			</div>
			{props.children}
		</div>
	);
};