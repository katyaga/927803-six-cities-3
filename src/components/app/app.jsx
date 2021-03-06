import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import PrivateRoute from "../private-route/private-route.jsx";
import {ActionCreator} from "../../reduser/offers/offers.js";
import Main from "../main/main.jsx";
import OfferInfo from "../offer-info/offer-info.jsx";
import SingIn from "../sing-in/sing-in.jsx";
import {AuthorizationStatus, Operation as UserOperation} from "../../reduser/user/user";
import {
  getCity,
  getCityOffers,
  getSelectedTitleId,
  getSortType,
  getFavoritesOffers
} from "../../reduser/offers/selector";
import {getAuthorizationStatus} from "../../reduser/user/selectors";
import history from "../../history.js";
import {AppRoute} from "../../const.js";
import Favorites from "../favorites/favorites.jsx";

const App = React.memo(function App(props) {

  const {cityOffers, city, login, sortType, onSortTypeClick, favoritesOffers, authorizationStatus} = props;

  return (
    <Router
      history={history}
    >
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main
            city={city}
            offersCount={cityOffers.length}
            offers={cityOffers}
            sortType={sortType}
            onSortTypeClick={onSortTypeClick}
          />
        </Route>
        <Route exact path={AppRoute.LOGIN} render={() => {
          return (
            authorizationStatus !== AuthorizationStatus.AUTH ?
              <SingIn
                onSubmit={login}
                city={city}/> :
              <Redirect to={AppRoute.ROOT}/>);
        }}
        >
        </Route>
        <Route exact path={`${AppRoute.OFFER}/:id`}>
          <OfferInfo
            offers={cityOffers}
          />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={() => {
            return (
              <Favorites offers={favoritesOffers}/>
            );
          }}
        />
      </Switch>
    </Router>
  );
});

App.propTypes = {
  login: PropTypes.func.isRequired,
  cityOffers: PropTypes.array.isRequired,
  favoritesOffers: PropTypes.array.isRequired,
  city: PropTypes.string.isRequired,
  selectedTitleId: PropTypes.number,
  sortType: PropTypes.string.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  city: getCity(state),
  cityOffers: getCityOffers(state),
  favoritesOffers: getFavoritesOffers(state),
  selectedTitleId: getSelectedTitleId(state),
  sortType: getSortType(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSortTypeClick(type) {
    dispatch(ActionCreator.setSortType(type));
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
