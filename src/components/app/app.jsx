import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import PrivateRoute from "../private-route/private-route.jsx";
import {ActionCreator} from "../../reduser/offers/offers.js";
import Main from "../main/main.jsx";
import OfferInfo from "../offer-info/offer-info.jsx";
import SingIn from "../sing-in/sing-in.jsx";
import {Operation as UserOperation} from "../../reduser/user/user";
import {
  getCity,
  getCityOffers,
  getSelectedTitleId,
  getSortType
} from "../../reduser/offers/selector";
import {getAuthorizationStatus} from "../../reduser/user/selectors";
import history from "../../history.js";
import {AppRoute} from "../../const.js";
import Favorites from "../favorites/favorites.jsx";

class App extends PureComponent {
  render() {
    const {cityOffers, selectedTitleId, city, login, sortType, onSortTypeClick} = this.props;
    const selectedCard = cityOffers.find((offer) => offer.id === selectedTitleId);

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
          <Route exact path={AppRoute.LOGIN}>
            <SingIn
              onSubmit={login}
              city={city}/>
          </Route>
          <Route exact path={AppRoute.getOffer(selectedTitleId)}>
            <OfferInfo
              offers={cityOffers}
              offer={selectedCard} />
          </Route>
          <PrivateRoute
            exact
            path={AppRoute.FAVORITES}
            render={() => {
              return (
                <Favorites/>
              );
            }}
          />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  login: PropTypes.func.isRequired,
  cityOffers: PropTypes.array.isRequired,
  city: PropTypes.string.isRequired,
  selectedTitleId: PropTypes.number,
  sortType: PropTypes.string.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  city: getCity(state),
  cityOffers: getCityOffers(state),
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
