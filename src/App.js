import React from 'react';
import './styles/all.scss';
import AsideArea from './components/AsideArea';
import MainArea from './components/MainArea';

class App extends React.Component {
	render() {
		return (
			<>
				<AsideArea/>
				<MainArea/>
			</>
		);
	}
}

export default App;