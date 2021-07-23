import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import { getSteps, setCurStep } from '../actions';
import ChoosePayMethod from './steps/ChoosePayMethod';
import PayByCreditCard from './steps/PayByCreditCard';
import PayByStore from './steps/PayByStore';
import PayByATM from './steps/PayByATM';
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

	componentDidMount() {
		this.props.getSteps();
		this.historyListen = history.listen((location) => {
			const [page] = location.pathname.substr(1).split('/');
			const idx = Object.values(this.props.steps).findIndex((step) => step.value === page);
			const step = Object.keys(this.props.steps)[idx];
			this.props.setCurStep(+step);
		});
	}

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
					component={PayByCreditCard}
				/>

				<Route
					path="/fill-in-info/convenience-store"
					exact
					component={PayByStore}
				/>

				<Route
					path="/fill-in-info/web-atm"
					exact
					component={PayByATM}
				/>
			</Router>
		);
	}
}

function mapStateToProps(state) {
	return { steps: state.steps };
}

export default connect(
	mapStateToProps,
	{ getSteps, setCurStep }
)(App);