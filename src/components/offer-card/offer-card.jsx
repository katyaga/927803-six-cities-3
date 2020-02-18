import React from "react";
import PropTypes from "prop-types";
import {RealtyType} from "../../const.js";

const OfferCard = (props) => {
  const {onHover, onCardTitleClick, offer} = props;
  const {isPremium, image, price, title, type, rating} = offer;
  const starRating = {
    width: `${rating * 20}%`,
  };

  return (
    <article className="cities__place-card place-card"
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
          <img className="place-card__image" src={image} width="260" height="200"
            alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button"
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
        <h2 className="place-card__name" onClick={onCardTitleClick}>
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
    isPremium: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.oneOf(Object.keys(RealtyType)).isRequired,
  }).isRequired,
};

export default OfferCard;
