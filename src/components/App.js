import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import { getSteps, setCurStep } from '../actions';
import ChoosePayMethod from './steps/ChoosePayMethod';
import PayByCreditCard from './steps/PayByCreditCard';
import PayByStore from './steps/PayByStore';
import PayByATM from './steps/PayByATM';
import Finish from './steps/Finish';
import FinishStore from './steps/FinishStore';
import '../styles/all.scss';

class App extends React.Component {
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
				<Switch>
					<Route
						path="/choose-pay-method" exact
						component={ChoosePayMethod}
					/>

					<Route
						path="/fill-in-info/credit-card" exact
						component={PayByCreditCard}
					/>

					<Route
						path="/fill-in-info/convenience-store" exact
						component={PayByStore}
					/>

					<Route
						path="/fill-in-info/web-atm" exact
						component={PayByATM}
					/>

					<Route
						path="/finish" exact
						component={Finish}
					/>

					<Route
						path="/finish/convenience-store" exact
						component={FinishStore}
					/>

					<Route render={() => <Redirect to="/choose-pay-method" />}/>
				</Switch>
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