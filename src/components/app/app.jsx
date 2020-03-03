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
      hoveredCardId,
      sortType,
      onCardTitleClick,
      onCardHover,
      onSortTypeClick,
    } = this.props;

    if (selectedTitleId) {
      const selectedCard = cityOffers.find((offer) => offer.id === selectedTitleId);

      return (
        <OfferInfo
          onTitleClick={onCardTitleClick}
          offers={cityOffers}
          offer={selectedCard}
          onCardHover={onCardHover}
          hoveredCardId={hoveredCardId}
        />
      );
    } else {
      return (
        <Main
          city={city}
          offersCount={cityOffers.length}
          offers={cityOffers}
          sortType={sortType}
          onTitleClick={onCardTitleClick}
          onCardHover={onCardHover}
          onSortTypeClick={onSortTypeClick}
          hoveredCardId={hoveredCardId}
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
              <OfferInfo
                onTitleClick={() => {}}
                offers={cityOffers}
                offer={cityOffers[0]}
                onCardHover={() => {}}
                hoveredCardId={1}/> : ``
            }
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  cityOffers: PropTypes.array.isRequired,
  city: PropTypes.string.isRequired,
  selectedTitleId: PropTypes.number,
  hoveredCardId: PropTypes.number,
  sortType: PropTypes.string.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  cityOffers: state.cityOffers,
  selectedTitleId: state.selectedTitleId,
  hoveredCardId: state.hoveredCardId,
  sortType: state.sortType,
});

const mapDispatchToProps = (dispatch) => ({
  onCardTitleClick(card) {
    dispatch(ActionCreator.setSelectedTitleId(card));
  },
  onCardHover(card) {
    dispatch(ActionCreator.setHoveredCardId(card));
  },
  onSortTypeClick(type) {
    dispatch(ActionCreator.setSortType(type));
    dispatch(ActionCreator.sortOffers());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
