import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import OfferList from "../offer-list/offer-list.jsx";
import Map from "../map/map.jsx";
import Cities from "../cities/cities.jsx";
import WithoutOffers from "../without-offers/without-offers.jsx";
import Sorting from "../sorting/sorting.jsx";
import Header from "../header/header.jsx";

class Main extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {city, offersCount, offers, sortType, onSortTypeClick} = this.props;

    return (
      <div className="page page--gray page--main">
        <Header />

        <main className={`page__main page__main--index ${offersCount < 1 ? `page__main--index-empty` : ``}`}>
          <h1 className="visually-hidden">city</h1>
          <div className="tabs">
            <section className="locations container">
              <Cities city={city}/>
            </section>
          </div>
          <div className="cities">
            {offersCount === 0 ? <WithoutOffers/> :
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offersCount} places to stay in {city}</b>
                  <Sorting
                    sortType={sortType}
                    onSortTypeClick={onSortTypeClick}/>
                  <OfferList
                    offers={offers}
                    isNearPlaces={false} />
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
  }
}

Main.propTypes = {
  city: PropTypes.string.isRequired,
  offersCount: PropTypes.number.isRequired,
  offers: PropTypes.array.isRequired,
  sortType: PropTypes.string.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
};

export default Main;
