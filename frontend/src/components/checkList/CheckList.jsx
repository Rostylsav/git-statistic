import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Item from './item/Item';
import { getNewItemObj, getItemIds, getSelectedItemIds } from './helper';
import './checkList.scss';

const CheckList = ({items, addItem, removeItems, updateItems, selectItems, displayStatus}) => {
    const [value, setValue] = useState('');
    const [list, setList] = useState([]);
    const itemIds = getItemIds(items);
    const selectedItems = getSelectedItemIds(items);

    const addItemToList = () => {
        const newItem = getNewItemObj(value);
        addItem(newItem);
        updateItems([newItem]);
        setValue('');
    }

    useEffect(() => {
        setList(items);
    }, [items]);

    return (
        <div className="checklist-container">
            <div className="item-input-container">
                <input
                    className="item-input"
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    onBlur={(e) => setValue(e.target.value)}
                /> 
                <button className="icon add-button" onClick={addItemToList}></button> 
            </div>
            <div className="checklist">
                {
                    list.map((item, index) => (
                        <Item
                            key={index}
                            item={ item }
                            removeItems={removeItems}
                            selectItems={selectItems}
                            displayStatus={displayStatus}
                        />
                    ))
                }
            </div>
            <div className="additional-buttons-container">
                <div className="checkbox-container">
                    <input
                        className="checkbox"
                        type="checkbox"
                        onChange={(e) => selectItems(itemIds, e.target.checked)}/>
                </div>
                <div className={ displayStatus ? "buttons-container" : "button-container"}>
                    {displayStatus &&
                        <button className="button" onClick={() => updateItems(selectedItems)}>
                            Update
                        </button>
                    }
                    <button className="button" onClick={() => removeItems(selectedItems)}>Delete</button> 
                </div>
            </div>
        </div>
    );
};

CheckList.defaultProps = {
    items: [],
    addItem: ()=> {},
    removeItems: ()=> {},
    updateItems: ()=> {},
    selectItems: ()=> {},
    displayStatus: false
};

CheckList.propTypes = {
    items: PropTypes.array,
    addItem: PropTypes.func,
    removeItems: PropTypes.func,
    updateItems: PropTypes.func,
    selectItems: PropTypes.func,
    displayStatus: PropTypes.bool
};

export default CheckList;