import React from "react";
import PropTypes from "prop-types";
import OfferCard from "../offer-card/offer-card.jsx";
import {ActionCreator, Operation} from "../../reduser/offers/offers";
import {connect} from "react-redux";
import {sortOffers} from "../../utils";
import {getSortType} from "../../reduser/offers/selector";
import {OffersType} from "../../const";

const classNames = {
  Default: `cities__places-list tabs__content places__list`,
  NearPlaces: `near-places__list tabs__content places__list`,
  Favorites: `favorites__places`,
};

const OfferList = React.memo(function OfferList(props) {
  const {sortType, offers, onCardTitleClick, type, onCardHover, onFavoritesClick} = props;
  const sortedOffers = sortOffers(sortType, offers);

  return (
    <div className={classNames[type]}>
      {sortedOffers.map((offer, i) => (
        <OfferCard
          key={i}
          onHover={onCardHover}
          onCardTitleClick={onCardTitleClick}
          onFavoritesClick={onFavoritesClick}
          offer={offer}
          offersType={type}
        />)
      )}
    </div>
  );
});

OfferList.propTypes = {
  onCardTitleClick: PropTypes.func.isRequired,
  offers: PropTypes.array.isRequired,
  type: PropTypes.oneOf(Object.values(OffersType)).isRequired,
  onCardHover: PropTypes.func.isRequired,
  onFavoritesClick: PropTypes.func.isRequired,
  sortType: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  sortType: getSortType(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCardTitleClick(card) {
    dispatch(ActionCreator.setSelectedTitleId(card));
    dispatch(Operation.setComments(card));
    dispatch(Operation.setNearbyOffers(card));
  },
  onCardHover(card) {
    dispatch(ActionCreator.setHoveredCardId(card));
  },
  onFavoritesClick(id, isFavorites) {
    isFavorites = isFavorites ? 1 : 0;
    dispatch(Operation.changeFavoritesOffer(id, isFavorites));
    dispatch(Operation.loadFavoritesOffers());
  },
});

export {OfferList};
export default connect(mapStateToProps, mapDispatchToProps)(OfferList);
