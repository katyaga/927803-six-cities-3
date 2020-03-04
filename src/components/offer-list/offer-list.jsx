import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";

class OfferList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {offers, onCardTitleClick, isNearPlaces, onCardHover} = this.props;

    return (
      <div className={`${isNearPlaces ? `near-places__list tabs__content` : `cities__places-list tabs__content`} places__list`}>
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            onHover={onCardHover}
            onCardTitleClick={onCardTitleClick}
            offer={offer}
            isNearPlace={isNearPlaces}
          />)
        )}
      </div>
    );
  }
}

OfferList.propTypes = {
  onCardTitleClick: PropTypes.func.isRequired,
  offers: PropTypes.array.isRequired,
  isNearPlaces: PropTypes.bool.isRequired,
  onCardHover: PropTypes.func.isRequired,
};

export default OfferList;
