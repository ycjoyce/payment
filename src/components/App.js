import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import ChoosePayment from './steps/ChoosePayment';
import '../styles/all.scss';


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
			<Router history={history}>
				<Route path="/" exact component={ChoosePayment}/>
				
			</Router>
		);
	}
}

export default App;