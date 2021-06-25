import React from 'react';
import List from '../List';

class ShowStoreFinish extends React.Component {
	render() {
		return (
			<>
				<h2>您的訂單已成立！</h2>
				<List
                    listItems={this.props.listItems}
                />
			</>
		);
	}
} 

export default ShowStoreFinish;