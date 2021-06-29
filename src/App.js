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
		this.handleFinish = this.handleFinish.bind(this);
		this.handleGetMainContentTop = this.handleGetMainContentTop.bind(this);
	}

	handleFinish(status) {
		if (this.state.finish !== status) {
			this.setState({
				finish: status,
			});
		}
	}

	handleGetMainContentTop(val) {
		this.setState({
			mainContentTop: val,
		});
	}

	render() {
		return (
			<div className="outer-container row g-0">
				<AsideArea
					finish={this.state.finish}
					top={this.state.mainContentTop}
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