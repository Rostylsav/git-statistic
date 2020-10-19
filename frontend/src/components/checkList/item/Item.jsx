import React from 'react';
import PropTypes from 'prop-types';

import './item.scss';

const Item = ({item, removeItems, selectItems, displayStatus}) => (
    <div className="item-container">
        <div className="checkbox-container">
            <input
                className="checkbox"
                type="checkbox"
                checked={item.isChecked}
                onChange={(e) => selectItems([item.id], e.target.checked)}/>
        </div>
        <div className="item">
            {item.name}
        </div>
        { displayStatus &&
            <div className="status-container">
                {
                    item.isExist ? <div className="icon correct-icon"/> : <div className="icon error-icon" /> 
                }
            </div>
        }
        <div className="remove-button-container">
            <button className="icon remove-button" onClick={() => removeItems([item])}></button>
        </div>
    </div>
);

Item.defaultProps = {
    item: {},
    removeItems: ()=> {},
    selectItems: ()=> {},
    displayStatus: false,
};

Item.propTypes = {
    item: PropTypes.object,
    removeItems: PropTypes.func,
    selectItems: PropTypes.func,
    displayStatus: PropTypes.bool
};

export default Item;