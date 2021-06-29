import React from 'react';

class ShowFinish extends React.Component {
	render() {
		return (
			<div className="text-center">
				<div className="show-finish-img-box mb-4">
					<img
						className="show-finish-img"
						src={require('../../assets/img/finish.svg').default}
						alt="payment finished"
					/>
				</div>
				
				<p className="mb-4">
					稍後將寄送訂單詳細資訊至您的E-mail
				</p>

				<button
					className="btn btn-primary text-white"
					onClick={this.props.handleChangeStep}
				>
					<small>返回首頁</small>
				</button>
			</div>
		);
	}
} 

export default ShowFinish;