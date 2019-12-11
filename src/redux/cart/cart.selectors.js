import {
    createSelector
} from 'reselect';

export const cartSelector = state => state.cart;

export const cartHiddenSelector = createSelector(
    [cartSelector],
    (cart) => cart.hidden
);

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

export const totalPriceSelector = createSelector(
    [cartItemsSelector],
    (cartItems) => {
        return cartItems.reduce((
            priceAccumulated,
            {price, quantity}
        ) => price * quantity + priceAccumulated, 0)
    }
)