import { Component } from 'react';
import { connect } from 'react-redux';
import TitleBar from './TitleBar';
import AsideArea from './AsideArea';
import MainArea from './MainArea';

class Layout extends Component {
	renderTitle() {
		if (!this.props.step.step) {
			return null;
		}
		return (
			<TitleBar
				title={`STEP${this.props.step.step}: ${this.props.step.title.default}`}
				subtitle={this.props.step.subtitle}
			/>
		);
	}

	render() {
		return (
			<div className="outer-container row g-0">
				<AsideArea
					// finish={this.state.finish}
					// top={this.state.mainContentTop}
					className="col-sm-3 align-self-start"
				/>

				<MainArea
					// handleFinish={this.handleFinish}
					// handleGetTop={this.handleGetMainContentTop}
					className="col-sm-9 d-flex flex-column"
				>
					{this.renderTitle()}
					{this.props.children}
				</MainArea>
			</div>
		);
	}
}

function mapStateToProps(state, { curPage }) {
	const [ mainType, subType ] = curPage.substr(1).split('/');
	const idx = Object.values(state.steps).findIndex((step) => step.value === mainType);
	let result = {
		...Object.values(state.steps)[idx], step: Object.keys(state.steps)[idx]
	};
	const payMethodMap = {
		'credit-card': '信用卡 / 金融卡',
		'convenience-store': '超商付款',
		'web-atm': 'Web ATM',
	};

	if (payMethodMap[subType]) {
		result = {...result, subtitle: payMethodMap[subType] };
	}

	return { step: result };
}

export default connect(mapStateToProps)(Layout);