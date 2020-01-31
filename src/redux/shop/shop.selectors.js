import {
    createSelector
} from 'reselect';

const shopSelector = state => state.shop

export const collectionsSelector = createSelector(
    [shopSelector],
    (shop) => shop.collections
);

export const collectionsForPreviewSelector = createSelector(
    [collectionsSelector],
    (collections) => collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const collectionSelector = (collectionUrlParam) => createSelector(
    [collectionsSelector],
    collections => (collections ? collections[collectionUrlParam] : null)
);

export const isCollectionsFetchingSelector = createSelector(
    [shopSelector],
    (shop) => shop.isFetching
);

export const isCollectionsLoadedSelector = createSelector(
    [collectionsSelector],
    (collections) => !!collections
)