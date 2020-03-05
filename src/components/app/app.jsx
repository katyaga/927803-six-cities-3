import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import Main from "../main/main.jsx";
import OfferInfo from "../offer-info/offer-info.jsx";
import Page from "../page/page.jsx";

class App extends PureComponent {
  _renderApp() {
    const {
      city,
      cityOffers,
      selectedTitleId,
      sortType,
      onSortTypeClick,
    } = this.props;

    if (selectedTitleId) {
      const selectedCard = cityOffers.find((offer) => offer.id === selectedTitleId);

      return (
        <Page>
          <OfferInfo
            offers={cityOffers}
            offer={selectedCard}
          />
        </Page>
      );
    } else {
      return (
        <Page>
          <Main
            city={city}
            offersCount={cityOffers.length}
            offers={cityOffers}
            sortType={sortType}
            onSortTypeClick={onSortTypeClick}
          />
        </Page>
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
              <Page>
                <OfferInfo
                  offers={cityOffers}
                  offer={cityOffers[0]} />
              </Page>
              : ``
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
  sortType: PropTypes.string.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  cityOffers: state.cityOffers,
  selectedTitleId: state.selectedTitleId,
  sortType: state.sortType,
});

const mapDispatchToProps = (dispatch) => ({
  onSortTypeClick(type) {
    dispatch(ActionCreator.setSortType(type));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
