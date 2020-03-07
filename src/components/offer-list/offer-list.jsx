import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";
import {ActionCreator} from "../../reducer";
import {connect} from "react-redux";
import {sortOffers} from "../../utils";

class OfferList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {sortType, offers, onCardTitleClick, isNearPlaces, onCardHover} = this.props;

    const sortedOffers = sortOffers(sortType, offers);

    return (
      <div className={`${isNearPlaces ? `near-places__list tabs__content` : `cities__places-list tabs__content`} places__list`}>
        {sortedOffers.map((offer) => (
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
  sortType: PropTypes.string.isRequired,
};

// export default OfferList;
const mapStateToProps = (state) => ({
  sortType: state.sortType,
});

const mapDispatchToProps = (dispatch) => ({
  onCardTitleClick(card) {
    dispatch(ActionCreator.setSelectedTitleId(card));
  },
  onCardHover(card) {
    dispatch(ActionCreator.setHoveredCardId(card));
  },
});

export {OfferList};
export default connect(mapStateToProps, mapDispatchToProps)(OfferList);
