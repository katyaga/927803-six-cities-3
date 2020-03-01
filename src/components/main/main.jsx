import React from "react";
import PropTypes from "prop-types";
// import {connect} from "react-redux";
import OfferList from "../offer-list/offer-list.jsx";
import Map from "../map/map.jsx";
import Cities from "../cities/cities.jsx";
import WithoutOffers from "../without-offers/without-offers.jsx";

const Main = (props) => {
  const {city, offersCount, offers, onTitleClick} = props;

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81"
                  height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index ${offersCount < 1 ? `page__main--index-empty` : ``}`}>
        <h1 className="visually-hidden">city</h1>
        <div className="tabs">
          <section className="locations container">
            <Cities city={city}/>
          </section>
        </div>
        <div className="cities">
          {offersCount === 0 ?
            <div className="cities__places-container cities__places-container--empty container">
              <WithoutOffers/>
            </div> :

            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersCount} places to stay in {city}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex="0">
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex="0">Popular</li>
                    <li className="places__option" tabIndex="0">Price: low to high</li>
                    <li className="places__option" tabIndex="0">Price: high to low</li>
                    <li className="places__option" tabIndex="0">Top rated first</li>
                  </ul>

                </form>
                <OfferList
                  onCardTitleClick={onTitleClick}
                  offers={offers}
                  isNearPlaces={false}/>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    offers={offers}
                    city={city}
                  />
                </section>
              </div>
            </div>
          }
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  city: PropTypes.string.isRequired,
  offersCount: PropTypes.number.isRequired,
  offers: PropTypes.array.isRequired,
  onTitleClick: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   offers: state.cityOffers,
//   city: state.city,
// });

export default Main;
// export default connect(mapStateToProps)(Main);
