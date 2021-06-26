import React from 'react';

class List extends React.Component {
    render() {
        let listClassName = 'list ps-0 mb-0';
        if (this.props.className) {
            listClassName += ` ${this.props.className}`;
        }
        
        let listItemContentClassName = 'list-item-content mb-0';
        if (this.props.listItemContentClassName) {
            listItemContentClassName += ` ${this.props.listItemContentClassName}`;
        }

        const listItems = this.props.listItems.map((item, index, arr) => {
            let listItemClassName = 'list-item';
            if (this.props.listItemClassName && index !== arr.length - 1) {
                listItemClassName += ` ${this.props.listItemClassName}`;
            }

            return (
                <li
                    className={listItemClassName}
                    key={item.title}
                >
                    {
                        item.title && 
                        <p className="list-item-title fw-light mb-0">
                            {item.title}
                        </p>
                    }
                    <p className={listItemContentClassName}>
                        {item.content}
                    </p>
                </li>
            );
			
        });

        return (
            <ul className={listClassName}>
                {listItems}
            </ul>
        );
    }
}

export default List;