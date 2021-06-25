import React from 'react';

class ShowFinish extends React.Component {
	render() {
		return (
			<>
				<h2>您的訂單已完成付款！</h2>
				<img
					src={require('../../assets/img/finish.svg').default}
					alt="payment finished"
				/>
				<p>
					稍後將寄送訂單詳細資訊至您的E-mail
				</p>
				<button>
					返回首頁
				</button>
			</>
		);
	}
} 

export default ShowFinish;