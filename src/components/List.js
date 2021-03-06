import { Component } from 'react';

class List extends Component {
    renderList() {
        return this.props.items.map((item) => (
            <li
                className="list-item mb-0"
                key={item.title}
            >
                {
                    item.title && 
                    <p className="list-item-title mb-0">
                        {item.title}
                    </p>
                }
                <p className="list-item-content mb-0">
                    {item.content}
                </p>
            </li>
        ));
    }

    render() {
        return (
            <ul className={`list ps-0 mb-0 ${this.props.className || ''}`}>
                {this.renderList()}
            </ul>
        );
    }
}

export default List;