import React from "react";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reduser/offers/offers";
import {connect} from "react-redux";
import City from "../city/city.jsx";
import {getCities} from "../../reduser/offers/selector";

const Cities = (props) => {
  const {cities, city, onCityClick} = props;

  return (
    <ul className="locations__list tabs__list">
      {cities.map((item, i) => (
        <City
          key={i}
          activeCity={city}
          city={item.name}
          onCityClick={onCityClick} />
      ))}
    </ul>
  );
};

Cities.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.object).isRequired,
  city: PropTypes.string.isRequired,
  onCityClick: PropTypes.func,
};

const mapStateToProps = (state) => ({
  cities: getCities(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(ActionCreator.setCity(city));
    dispatch(ActionCreator.setOffers());
  },
});

export {Cities};
export default connect(mapStateToProps, mapDispatchToProps)(Cities);
