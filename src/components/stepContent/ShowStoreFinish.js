import React from 'react';
import List from '../List';

class ShowStoreFinish extends React.Component {
	render() {
		return (
			<>
				<List
                    listItems={this.props.listItems}
					listItemClassName="mb-4"
					listItemContentClassName="fs-3"
					className="mb-4"
                />

				<small className="d-flex">
					<span className="flex-shrink-0 me-1">*</span>
					<span>請至您選擇之超商店內機台輸入代碼進行繳費，逾期訂單自動作廢。</span>
				</small>
			</>
		);
	}
} 

export default ShowStoreFinish;