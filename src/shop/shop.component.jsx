import React, { Component } from 'react';
import CollectionsOverviewContainer from '../components/collections-overview/collections-overview.container'
import { Route } from 'react-router-dom'
import CollectionPageContainer from '../pages/collection/collection.container';
import { connect } from 'react-redux';
import { fetchCollectionsStartAsync } from '../redux/shop/shop.actions'



class ShopPage extends Component {

    componentDidMount() {

        const { fetchCollectionsStartAsync } = this.props
        fetchCollectionsStartAsync();
    }

    render() {
        const { match } = this.props;
        
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer}
                />
                <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}
                />
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

//export
export default connect(null, mapDispatchToProps)(ShopPage);
