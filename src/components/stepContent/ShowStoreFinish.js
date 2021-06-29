import React from 'react';
import List from '../List';

class ShowStoreFinish extends React.Component {
	render() {
		return (
			<>
				<List
                    listItems={this.props.listItems}
					className="show-store-finish-list mb-4"
                />

				<small className="d-flex mb-4">
					<span className="flex-shrink-0 me-1">*</span>
					<span>請至您選擇之超商店內機台輸入代碼進行繳費，逾期訂單自動作廢。</span>
				</small>

				<button
					className="btn btn-primary text-white d-block ms-auto"
					onClick={this.props.handleChangeStep}
				>
					<small>返回首頁</small>
				</button>
			</>
		);
	}
} 

export default ShowStoreFinish;