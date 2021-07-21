import { Component } from 'react';
import AsideArea from './AsideArea';
import MainArea from './MainArea';

class Layout extends Component {
    render() {
        return (
            <div className="outer-container row g-0">
                <AsideArea
                    // finish={this.state.finish}
                    // top={this.state.mainContentTop}
                    // orderInfoContent={this.orderInfoContent}
                    className="col-sm-3 align-self-start"
                />
                <MainArea
                    // handleFinish={this.handleFinish}
                    // handleGetTop={this.handleGetMainContentTop}
                    className="col-sm-9 d-flex flex-column"
                />
            </div>
        );
    }
}

export default Layout;