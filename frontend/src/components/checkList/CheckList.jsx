import React, { useState } from 'react';

import './checkList.scss';

const Item = ({item, removeItems}) => (
    <div className="item-container">
        <div className="checkbox-container">
            <input className="checkbox" type="checkbox" />
        </div>
        <div className="item">
            {item.name}
        </div>
        <div className="status-container">
            {
                item.isExist ? <div className="icon correct-icon"/> : <div className="icon error-icon" /> 
            }
        </div>
        <div className="remove-button-container">
            <button className="icon remove-button" onClick={() => removeItems([item.id])}></button>
        </div>
    </div>
);

const CheckList = ({items, addItem, removeItems}) => {
    const [value, setValue] = useState('');

    console.log(items)
    return (
        <div className="checklist-container">
            <div className="checklist">
                {
                    items.map((item, index) => (
                        <Item key={index}item={ item } removeItems={removeItems} />
                    ))
                }
            </div>
            <div className="item-input-container">
                <input className="item-input" onBlur={(e) => setValue(e.target.value)}/> 
                <button className="icon add-button" onClick={() => addItem(value)}></button> 
            </div>
        </div>
    );
}

export default CheckList;