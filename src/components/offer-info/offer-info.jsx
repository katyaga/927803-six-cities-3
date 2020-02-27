import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {RealtyType} from "../../const";
import Reviews from "../reviews/reviews.jsx";
import Map from "../map/map.jsx";
import OfferList from "../offer-list/offer-list.jsx";

const OfferInfo = (props) => {
  const {onTitleClick, offer, offers} = props;
  const {isPremium, images, price, title, type, description, bedroomsCount,
    guestsCount, facilities, rating, host, isFavorites, comments} = offer;
  const {avatar, name, isSuper} = host;

  const MAX_IMAGES_COUNT = 6;
  const shownImages = images.slice(0, MAX_IMAGES_COUNT);
  const starRating = {
    width: `${rating * 20}%`,
  };

  const nearbyOffers = [];
  (offer.nearbyOffers.slice(0, 3)).forEach((nearbyOffer) => {
    nearbyOffers.push(offers.find((item) => item.id === nearbyOffer));
  });

  return (
    <Fragment>
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {shownImages.map((image, i) => (
              <div key={image + i} className="property__image-wrapper">
                <img className="property__image" src={image} alt="Photo studio"/>
              </div>
            ))
            }
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {isPremium ? <div className="property__mark">
              <span>Premium</span>
            </div> : ``}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {title}
              </h1>
              <button className={`property__bookmark-button ${isFavorites ? `property__bookmark-button--active` : ``} button`} type="button">
                <svg className="property__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={starRating}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {type}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {bedroomsCount} Bedrooms
              </li>
              <li className="property__feature property__feature--adults">
                Max {guestsCount} adults
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {facilities.map((item, i) => (
                  <li key={item + i} className="property__inside-item">
                    {item}
                  </li>
                ))
                }
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div
                  className={`property__avatar-wrapper ${isSuper ? `property__avatar-wrapper--pro` : ``} user__avatar-wrapper`}>
                  <img className="property__avatar user__avatar" src={avatar} width="74"
                    height="74" alt="Host avatar"/>
                </div>
                <span className="property__user-name">
                  {name}
                </span>
              </div>
              <div className="property__description">
                <p className="property__text">
                  {description}
                </p>
              </div>
            </div>
            <Reviews
              comments={comments}
            />)
          </div>
        </div>
        <section className="property__map map">
          <Map
            offers={nearbyOffers}
            activeOffer={offer}
          />
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <OfferList
            onCardTitleClick={onTitleClick}
            offers={nearbyOffers}
            isNearPlaces={true} />
        </section>
      </div>
    </Fragment>
  );
};

OfferInfo.propTypes = {
  onTitleClick: PropTypes.func.isRequired,
  offer: PropTypes.shape({
    isPremium: PropTypes.bool.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.oneOf(Object.values(RealtyType)).isRequired,
    description: PropTypes.string.isRequired,
    bedroomsCount: PropTypes.number.isRequired,
    guestsCount: PropTypes.number.isRequired,
    facilities: PropTypes.array.isRequired,
    host: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
    }),
    isFavorites: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object),
    nearbyOffers: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OfferInfo;

