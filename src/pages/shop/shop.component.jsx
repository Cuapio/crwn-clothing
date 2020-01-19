import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';

import './shop.styles.scss';

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }
    unsubscribeFromSnaphot = null;
    
    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({isLoading: false});
        });
    }

    render() {
        const { match } = this.props;
        const { isLoading } = this.state;
        return (
            <div className="shop-page">
                <Route 
                    exact 
                    path={match.path} 
                    render={(props) => <CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />} 
                />
                <Route 
                    path={`${match.path}/:collectionId`} 
                    render={(props) => <CollectionPageWithSpinner isLoading={isLoading} {...props} />}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCollections: (collections) => dispatch(updateCollections(collections))
})

export default connect(null, mapDispatchToProps)(ShopPage);