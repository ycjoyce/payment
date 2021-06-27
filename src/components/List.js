import React from 'react';

class List extends React.Component {
    render() {
        let containerClassName = 'list ps-0 mb-0';
        if (this.props.className) {
            containerClassName += ` ${this.props.className}`;
        }
        
        const listItems = this.props.listItems.map((item) => (
            <li
                className="list-item-content mb-0"
                key={item.title}
            >
                {
                    item.title && 
                    <p className="list-item-title mb-0">
                        {item.title}
                    </p>
                }
                <p className="list-item">
                    {item.content}
                </p>
            </li>
        ));

        return (
            <ul className={containerClassName}>
                {listItems}
            </ul>
        );
    }
}

export default List;