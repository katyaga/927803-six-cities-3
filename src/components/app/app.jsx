import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import OfferInfo from "../offer-info/offer-info.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._onCardTitleClick = this._onCardTitleClick.bind(this);

    this.state = {
      selectedTitleId: null
    };
  }

  _renderApp() {
    const {offersCount, offers} = this.props;

    if (this.state.selectedTitleId) {
      const selectedCard = offers.find((offer) => offer.id === this.state.selectedTitleId);

      return (
        <OfferInfo offer={selectedCard}/>
      );
    } else {
      return (
        <Main
          offersCount={offersCount}
          offers={offers}
          onTitleClick={this._onCardTitleClick}
        />
      );
    }
  }

  render() {
    const {offers} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/offer-info">
            <OfferInfo offer={offers[0]}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }

  _onCardTitleClick(selectedTitleId) {
    this.setState({
      selectedTitleId
    });
  }
}

App.propTypes = {
  offersCount: PropTypes.number.isRequired,
  offers: PropTypes.array.isRequired,
};

export default App;
