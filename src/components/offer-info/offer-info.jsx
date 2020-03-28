import React, {PureComponent, Fragment} from "react";
import PropTypes from "prop-types";
import {OffersType, REALTY_TYPES} from "../../const";
import Reviews from "../reviews/reviews.jsx";
import Map from "../map/map.jsx";
import OfferList from "../offer-list/offer-list.jsx";
import {getComments, getNearbyOffers} from "../../reduser/offers/selector";
import {connect} from "react-redux";
import {getAuthorizationStatus} from "../../reduser/user/selectors";
import ReviewsForm from "../reviews-form/reviews-form.jsx";
import Header from "../header/header.jsx";
import withForm from "../../hocs/withForm.js";
import {Operation} from "../../reduser/offers/offers";

const FeedbackForm = withForm(ReviewsForm);

class OfferInfo extends PureComponent {
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
    const {authorizationStatus, offer, offers, comments, nearbyOffers} = this.props;
    const {
      isPremium,
      images,
      price,
      title,
      type,
      description,
      bedroomsCount,
      guestsCount,
      facilities,
      rating,
      host,
      isFavorites
    } = offer;
    const {avatar, name, isSuper} = host;

    const MAX_IMAGES_COUNT = 6;
    const shownImages = images.slice(0, MAX_IMAGES_COUNT);
    const starRating = {
      width: `${rating * 20}%`,
    };

    const nearbyOffersList = [];
    if (nearbyOffers.length > 0) {
      (nearbyOffers.slice(0, 3)).forEach((nearbyOffer) => {
        if (offers.length > 1) {
          nearbyOffersList.push(offers.find((item) => item.id === nearbyOffer));
        }
      });
    }

    return (
      <Fragment>
        <div className="page">
          <Header />
          <main className="page__main page__main--property">
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
                    <button className={`property__bookmark-button ${isFavorites ? `property__bookmark-button--active` : ``} button`}
                      onClick={this._onBookmarkButtonClick}
                      type="button">
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
                        <img className="property__avatar user__avatar" src={`/${avatar}`} width="74"
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
                  <section className="property__reviews reviews">
                    <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                    <Reviews
                      comments={comments}
                    />
                    {authorizationStatus === `AUTH` ?
                      <FeedbackForm
                        selectedTitleId={offer.id} /> : ``}
                  </section>
                </div>
              </div>
              <section className="property__map map">
                <Map
                  offers={nearbyOffersList}
                  activeOffer={offer}
                  city={offer.city.name}
                />
              </section>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>

                <OfferList
                  offers={nearbyOffersList}
                  type={OffersType.NEAR_PLACES} />
              </section>
            </div>
          </main>
        </div>
      </Fragment>
    );
  }
}

OfferInfo.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    city: PropTypes.object.isRequired,
    isPremium: PropTypes.bool.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    type: PropTypes.oneOf(REALTY_TYPES).isRequired,
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
  }).isRequired,
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  comments: PropTypes.arrayOf(PropTypes.object),
  nearbyOffers: PropTypes.arrayOf(PropTypes.number),
  onFavoritesClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  nearbyOffers: getNearbyOffers(state),
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFavoritesClick(id, isFavorites) {
    isFavorites = isFavorites ? 1 : 0;
    dispatch(Operation.changeFavoritesOffer(id, isFavorites));
    dispatch(Operation.loadFavoritesOffers());
  },
});

export {OfferInfo};
export default connect(mapStateToProps, mapDispatchToProps)(OfferInfo);

