import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
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

class App extends PureComponent {
  _renderApp() {
    const {
      authorizationStatus,
      login,
      city,
      cityOffers,
      selectedTitleId,
      sortType,
      onSortTypeClick,
    } = this.props;

    if (authorizationStatus === `NO_AUTH`) {
      return (
        <SingIn
          onSubmit={login}
          city={city}/>
      );
    } else {
      if (selectedTitleId) {
        const selectedCard = cityOffers.find((offer) => offer.id === selectedTitleId);

        return (
          <OfferInfo
            offers={cityOffers}
            offer={selectedCard}
          />
        );
      } else {
        return (
          <Main
            city={city}
            offersCount={cityOffers.length}
            offers={cityOffers}
            sortType={sortType}
            onSortTypeClick={onSortTypeClick}
          />
        );
      }
    }

    // if (selectedTitleId) {
    //   const selectedCard = cityOffers.find((offer) => offer.id === selectedTitleId);
    //
    //   return (
    //     <OfferInfo
    //       offers={cityOffers}
    //       offer={selectedCard}
    //     />
    //   );
    // } else {
    //   return (
    //     // <SingIn
    //     //   onSubmit={login}
    //     //   city={city}/>
    //     <Main
    //       city={city}
    //       offersCount={cityOffers.length}
    //       offers={cityOffers}
    //       sortType={sortType}
    //       onSortTypeClick={onSortTypeClick}
    //     />
    //   );
    // }
  }

  render() {
    const {cityOffers, selectedTitleId, city} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer-info">
            {selectedTitleId ?
              <OfferInfo
                offers={cityOffers}
                offer={cityOffers[0]} />
              : ``
            }
          </Route>
          <Route exact path="/login">
            <SingIn
              onSubmit={() => {}}
              city={city}/>
          </Route>
        </Switch>
      </BrowserRouter>
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
