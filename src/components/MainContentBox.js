import React from 'react';


class MainContentBox extends React.Component {
	render() {
		return (
			<div className="main-content shadow p-4">
				<div className="content-title-bar text-center">
					<h2 className="content-title d-inline-block fs-4 title-bgc-secondary title-spacing">
						{this.props.title}
					</h2>

					{
						this.props.subtitle &&
						<h3 className="text-sm text-bold">
							{this.props.subtitle}
						</h3>
					}
				</div>
				
				{this.props.children}
			</div>
		);
	}
}

export default MainContentBox;