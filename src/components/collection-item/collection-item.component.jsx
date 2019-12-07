import React from 'react';

import { connect } from 'react-redux'
import { addItem } from '../../redux/cart/cart.actions';

import './collection-item.styles.scss';

import Custombutton from '../costum-button/costum-button.component';


const CollectionItem = ({ item, addItem }) => {
    const { name, imageUrl, price } = item;
    return (
        <div className="collection-item">
            <div className="image"
                style={{backgroundImage: `url(${imageUrl})`}}
            />
            <div className="collection-item-footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Custombutton onClick={() => addItem(item)} inverted>
                Add to 
            </Custombutton>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);