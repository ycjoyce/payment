import React from 'react';


class MainContentBox extends React.Component {
	render() {
		return (
			<>
				<div className="content-title">
					<h2 className="title-pmr bgc-sdr text-bold">
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
			</>
		);
	}
}

export default MainContentBox;