import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {REALTY_TYPES} from "../../const.js";
import {AppRoute, OffersType} from "../../const";

const classNames = {
  Default: {
    card: `cities__place-card place-card`,
    wrap: `cities__image-wrapper place-card__image-wrapper`,
    info: `place-card__info`,
  },
  NearPlaces: {
    card: `near-places__card place-card`,
    wrap: `near-places__image-wrapper place-card__image-wrapper`,
    info: `place-card__info`,
  },
  Favorites: {
    card: `favorites__card place-card`,
    wrap: `favorites__image-wrapper place-card__image-wrapper`,
    info: `favorites__card-info place-card__info`,
  },
};

class OfferCard extends PureComponent {
  constructor(props) {
    super(props);

    this.isFavorites = this.props.offer.isFavorites;
    this._onBookmarkButtonClick = this._onBookmarkButtonClick.bind(this);
  }

  _onBookmarkButtonClick() {
    const {onFavoritesClick, offer} = this.props;
    this.isFavorites = !this.isFavorites;
    onFavoritesClick(offer.id, this.isFavorites);
  }

  render() {
    const {onHover, onCardTitleClick, offer, offersType} = this.props;
    const {id, isPremium, images, price, title, type, rating, isFavorites} = offer;
    const starRating = {
      width: `${rating * 20}%`,
    };

    return (
      <article className={classNames[offersType].card}
        onMouseEnter={() => {
          onHover(offer.id);
        }}
        onMouseLeave={() => {
          onHover(null);
        }}>
        {isPremium ? <div className="place-card__mark">
          <span>Premium</span>
        </div> : ``}
        <div className={classNames[offersType].wrap}>
          <a href="#">
            <img className="place-card__image" src={images[0]} width="260" height="200"
              alt="Place image"/>
          </a>
        </div>
        <div className={classNames[offersType].info}>
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className={`place-card__bookmark-button ${isFavorites ? `place-card__bookmark-button--active` : ``} button`}
              type="button" onClick={this._onBookmarkButtonClick}>
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
            <Link to={AppRoute.getOffer(id)}>{title}</Link>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    );
  }
}

OfferCard.propTypes = {
  onHover: PropTypes.func.isRequired,
  onCardTitleClick: PropTypes.func.isRequired,
  onFavoritesClick: PropTypes.func.isRequired,
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isPremium: PropTypes.bool.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.oneOf(REALTY_TYPES).isRequired,
    isFavorites: PropTypes.bool.isRequired,
  }).isRequired,
  offersType: PropTypes.oneOf(Object.values(OffersType)).isRequired,
};

export default OfferCard;
