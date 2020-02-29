import React from "react";
import PropTypes from "prop-types";
import {RealtyType} from "../../const.js";
// import {ActionCreator} from "../../reducer";
// import {connect} from "react-redux";

const OfferCard = (props) => {
  const {onHover, onCardTitleClick, offer, isNearPlace} = props;
  const {id, isPremium, images, price, title, type, rating, isFavorites} = offer;
  const starRating = {
    width: `${rating * 20}%`,
  };

  return (
    <article className={`${isNearPlace ? `near-places__card` : `cities__place-card`} place-card`}
      onMouseOver={(evt) => {
        evt.preventDefault();
        onHover(offer);
      }
      }
    >
      {isPremium ? <div className="place-card__mark">
        <span>Premium</span>
      </div> : ``}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={images[0]} width="260" height="200"
            alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorites ? `place-card__bookmark-button--active` : ``} button`}
            type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={starRating}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name"
          onClick={() => onCardTitleClick(id)}
        >
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

OfferCard.propTypes = {
  onHover: PropTypes.func,
  onCardTitleClick: PropTypes.func.isRequired,
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.oneOf(Object.values(RealtyType)).isRequired,
    isFavorites: PropTypes.bool.isRequired,
  }).isRequired,
  isNearPlace: PropTypes.bool.isRequired,
};

export default OfferCard;
// const mapDispatchToProps = (dispatch) => ({
//   onCardTitleClick(card) {
//     dispatch(ActionCreator.setSelectedTitleId(card));
//   },
// });
//
// export default connect(null, mapDispatchToProps)(OfferCard);
