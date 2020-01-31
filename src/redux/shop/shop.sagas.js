import {
    takeLatest,
    call,
    put,
    all
} from 'redux-saga/effects';

import {
    firestore,
    convertCollectionSnapshotToMap
} from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure} from './shop.actions';

import shopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
    try{
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionMap = yield call(convertCollectionSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionMap));
    } catch(error) {
        yield put(fetchCollectionsFailure(error));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        shopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ]);
}