import React from 'react'
import { connect } from 'react-redux'
import './collections-overview.styles.scss'
import CollectionPreview from '../collection-preview/collection-preview.component'
import { selectShopDataForPreview } from '../../redux/shop/shop.selector'
import { createStructuredSelector } from 'reselect'


const CollectionsOverview = ({collections}) => {

    return(
        <div className="collections-overview">
            {
                collections.map(({id, ...otherCollectionProps}) => (
                    <CollectionPreview key={id} {...otherCollectionProps}/>
                ))
            }
        </div>
    )
}

//-- Redux
const mapStateToProps = createStructuredSelector({
    collections: selectShopDataForPreview
})

export default connect(mapStateToProps)(CollectionsOverview);