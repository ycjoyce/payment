import React from 'react';
import './styles/all.scss';
import AsideArea from './components/AsideArea';
import MainArea from './components/MainArea';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			finish: false,
			mainContentTop: 0,
		};

		// fake data
		this.orderInfoContent = [
			{
				title: '商品名稱',
				content: 'Iphone XR 手機殼 x 1',
			},
			{
				title: '訂單編號',
				content: '17485739',
			},
			{
				title: '訂單金額',
				content: 'NT$ 600',
			}
		];

		this.handleFinish = this.handleFinish.bind(this);
		this.handleGetMainContentTop = this.handleGetMainContentTop.bind(this);
	}

	handleFinish(status) {
		if (this.state.finish !== status) {
			this.setState({ finish: status });
		}
	}

	handleGetMainContentTop(val) {
		this.setState({ mainContentTop: val });
	}

	render() {
		return (
			<div className="outer-container row g-0">
				<AsideArea
					finish={this.state.finish}
					top={this.state.mainContentTop}
					orderInfoContent={this.orderInfoContent}
					className="col-sm-3 align-self-start"
				/>
				<MainArea
					handleFinish={this.handleFinish}
					handleGetTop={this.handleGetMainContentTop}
					className="col-sm-9 d-flex flex-column"
				/>
			</div>
		);
	}
}

export default App;