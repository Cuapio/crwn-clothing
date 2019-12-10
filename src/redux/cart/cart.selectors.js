import {
    createSelector
} from 'reselect';

export const cartSelector = state => state.cart;

export const cartItemsSelector = createSelector(
    [cartSelector],
    (cart) => cart.cartItems
);

export const itemCountSelector = createSelector(
    [cartItemsSelector],
    (cartItems) => cartItems.reduce((
        accumulatedQuantity,
        cartItem
    ) => accumulatedQuantity + cartItem.quantity, 0)
);