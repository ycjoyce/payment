import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../history';
import ChoosePayMethod from './steps/ChoosePayMethod';
import PayByCreditCard from './steps/PayByCreditCard';
import '../styles/all.scss';

class App extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			finish: false,
// 			mainContentTop: 0,
// 		};
// 		this.handleFinish = this.handleFinish.bind(this);
// 		this.handleGetMainContentTop = this.handleGetMainContentTop.bind(this);
// 	}
// 
// 	handleFinish(status) {
// 		if (this.state.finish !== status) {
// 			this.setState({ finish: status });
// 		}
// 	}
// 
// 	handleGetMainContentTop(val) {
// 		this.setState({ mainContentTop: val });
// 	}

	render() {
		return (
			<Router history={history}>
				<Route
					path="/choose-pay-method"
					exact
					component={ChoosePayMethod}
				/>

				<Route
					path="/fill-in-info/credit-card"
					exact
					render={(props) => (
						<PayByCreditCard
							{...props}
							initialValues={{
								installment: 'pay-once',
								cardNum: { 1: '', 2: '', 3: '', 4: '' },
							}}
						/>
					)}
				/>
			</Router>
		);
	}
}

export default App;