import React, { Component } from 'react';
import CollectionsOverview from '../components/collections-overview/collections-overview.component'
import { Route } from 'react-router-dom'
import CollectionPage from '../pages/collection/collection.component';
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../redux/shop/shop.actions'
import { createStructuredSelector } from 'reselect'
import WithSpinner from '../components/with-spinner/with-spinner.component'
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../redux/shop/shop.selector'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends Component {

    componentDidMount() {

        const { fetchCollectionsStartAsync } = this.props
        fetchCollectionsStartAsync();
    }

    render() {
        const { match, isFetchingCollections, isCollectionsLoaded } = this.props;
        
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} render={
                        (props) => <CollectionsOverviewWithSpinner isLoading={isFetchingCollections} {...props} />
                    }
                />
                <Route path={`${match.path}/:collectionId`} render={
                        (props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />
                    }
                />
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isFetchingCollections: selectIsCollectionFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

//export
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
