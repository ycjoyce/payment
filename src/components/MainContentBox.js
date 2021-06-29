import React from 'react';

class MainContentBox extends React.Component {
	constructor(props) {
		super(props);
		this.mainContent = React.createRef();
	}

	componentDidMount() {
		this.props.handleGetTop(this.mainContent.current.offsetTop);
	}

	render() {
		return (
			<div
				className="main-content shadow p-4 overflow-scroll flex-grow-1 bg-white"
				ref={this.mainContent}
			>
				<div className="content-title-bar text-center mb-4">
					<h2 className="content-title d-inline-block fs-4 title-bgc-secondary title-spacing">
						{this.props.title}
					</h2>

					{
						this.props.subtitle &&
						<small className="fw-bold d-block">
							{this.props.subtitle}
						</small>
					}
				</div>
				
				{this.props.children}
			</div>
		);
	}
}

export default MainContentBox;