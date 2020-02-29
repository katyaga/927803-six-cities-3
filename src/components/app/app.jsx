import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import Main from "../main/main.jsx";
import OfferInfo from "../offer-info/offer-info.jsx";

class App extends PureComponent {
  _renderApp() {
    const {
      city,
      cityOffers,
      selectedTitleId,
      onCardTitleClick,
    } = this.props;

    if (selectedTitleId) {
      const selectedCard = cityOffers.find((offer) => offer.id === selectedTitleId);

      return (
        <OfferInfo onTitleClick={onCardTitleClick} offers={cityOffers} offer={selectedCard}/>
      );
    } else {
      return (
        <Main
          city={city}
          offersCount={cityOffers.length}
          offers={cityOffers}
          onTitleClick={onCardTitleClick}
        />
      );
    }
  }

  render() {
    const {cityOffers, selectedTitleId} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer-info">
            {selectedTitleId ?
              <OfferInfo onTitleClick={() => {
              }} offers={cityOffers} offer={cityOffers[0]}/> : ``
            }
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  // cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  cityOffers: PropTypes.array.isRequired,
  city: PropTypes.string.isRequired,
  selectedTitleId: PropTypes.number,
  onCardTitleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  cityOffers: state.cityOffers,
  selectedTitleId: state.selectedTitleId,
});

const mapDispatchToProps = (dispatch) => ({
  onCardTitleClick(card) {
    dispatch(ActionCreator.setSelectedTitleId(card));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
