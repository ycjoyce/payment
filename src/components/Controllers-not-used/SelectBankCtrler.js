import React from 'react';
import BasicSelector from './BasicSelector';

class SelectBankCtrler extends React.Component {
	handleChange = (e) => {
		this.props.getData(e.target.value);
	}

	makeOptions(bankList) {
		let options = [{
			code: 'placeholder',
			name: '選擇銀行',
		}];

		for (let category in bankList) {
			if (!{}.hasOwnProperty.call(bankList, category)) {
				continue;
			}
			options = options.concat(bankList[category]);
		}

		options = options.map((bank) => (
			<option
				value={bank.code}
				key={bank.code}
				disabled={bank.code === 'placeholder'}
			>
				{bank.code !== 'placeholder' ? `${bank.code} ` : ''}{bank.name}
			</option>
		));

		return options;
	}

	render() {
		const { bankList, className, bank, unvalid } = this.props;
		const containerClassName = `bank-selector ${className || ''}`;
		const options = this.makeOptions(bankList);

		return (
			<BasicSelector
				className={containerClassName}
				title="付款銀行"
				value={bank}
				unvalid={unvalid}
				errorMsg="請選擇付款銀行"
				options={options}
				handleChange={this.handleChange}
			>
				<ol className="mt-4 ps-4">
					<li>
						請準備晶片金融卡＋晶片讀卡機，我們將引導您至指定金融機構之網路ATM進行交易手續。
					</li>
					<li>
						持對應機構之金融卡可享免跨行轉帳手續費，若無以上金融機構發行之金融卡，可自由選擇其一金融機構進行後續交易流程。
					</li>
				</ol>
			</BasicSelector>
		);
	}
}

export default SelectBankCtrler;