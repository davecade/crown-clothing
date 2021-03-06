import './App.css';
import React, { useEffect, Fragment } from 'react';
import HomePage from './pages/homepage/homepage.component'
import { Switch, Route, Redirect } from 'react-router-dom';
import ShopPage from './shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import CheckoutPage from './pages/checkout/checkout.component'
import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors'
import { createStructuredSelector } from 'reselect';
import { selectShopDataForPreview } from './redux/shop/shop.selector';
import { checkUserSession } from './redux/user/user.actions'


//-- Starting Transfer of user into Sagas

// -- Main App
const App = ({ checkUserSession, currentUser }) => {

  useEffect(()=>{
    checkUserSession()
  }, [checkUserSession])

  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route path='/signin' render={() => currentUser ? (<Redirect to="/"/>) : (<SignInAndSignUp />)}/>
      </Switch>
    </Fragment>
)
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectShopDataForPreview
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
