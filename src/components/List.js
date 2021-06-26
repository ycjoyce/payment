import React from 'react';

class List extends React.Component {
    render() {
        let listClassName = 'list ps-0 mb-0';
        if (this.props.className) {
            listClassName += ` ${this.props.className}`;
        }

        const listItems = this.props.listItems.map((item) => (
			<li
				className="list-item"
				key={item.title}
			>
                {
                    item.title && 
                    <p className="list-item-title fw-light mb-0">
                        {item.title}
                    </p>
                }
				<p className="list-item-content">
					{item.content}
				</p>
			</li>
		));

        return (
            <ul className={listClassName}>
                {listItems}
            </ul>
        );
    }
}

export default List;