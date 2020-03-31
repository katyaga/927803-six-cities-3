import React from "react";
import Header from "../header/header.jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {AppRoute, OffersType} from "../../const";
import OfferList from "../offer-list/offer-list.jsx";
import {getFavoritesOffers} from "../../reduser/offers/selector";
import FavoritesEmpty from "../favorites-empty/favorites-empty.jsx";
import {getFavoriteOffers} from "../../utils";
import {Link} from "react-router-dom";

const Favorites = (props) => {
  const {offers} = props;
  let sortedOffers;
  if (offers.length > 0) {
    sortedOffers = getFavoriteOffers(offers);
  }

  return (
    <div className={`${offers.length < 1 ? `page--favorites-empty` : ``} page`}>
      <Header />
      {offers.length < 1 ? <FavoritesEmpty/> :
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>

              <ul className="favorites__list">
                {sortedOffers.map((city, i) => {
                  return (
                    <li key={i} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city.city}</span>
                          </a>
                        </div>
                      </div>
                      <OfferList
                        offers={city.offers}
                        type={OffersType.FAVORITES} />
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </main>}
      <footer className="footer">
        <Link className="footer__logo-link" to={AppRoute.ROOT}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64"
            height="33"/>
        </Link>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  offers: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getFavoritesOffers(state),
});

export {Favorites};
export default connect(mapStateToProps)(Favorites);
