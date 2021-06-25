import React from 'react';
import './styles/all.scss';
import AsideArea from './components/AsideArea';
import MainArea from './components/MainArea';

class App extends React.Component {
	render() {
		return (
			<div className="row">
				<AsideArea
					className="col-sm-3"
				/>
				<MainArea
					className="col-sm-9"
				/>
			</div>
		);
	}
}

export default App;