import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";

class OfferList extends PureComponent {
  constructor(props) {
    super(props);

    this.handleCardHover = this.handleCardHover.bind(this);
    this.state = {
      activeCard: {},
    };
  }

  handleCardHover(offer) {
    this.setState({
      activeCard: offer,
    });
  }

  render() {
    const {offers, onCardTitleClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            onHover={this.handleCardHover}
            onCardTitleClick={onCardTitleClick}
            offer={offer}
          />)
        )}
      </div>
    );
  }
}

OfferList.propTypes = {
  onCardTitleClick: PropTypes.func.isRequired,
  offers: PropTypes.array.isRequired,
};

export default OfferList;
