import React from "react";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer";
import {connect} from "react-redux";
import City from "../city/city.jsx";

const Cities = (props) => {
  const {cities, city, handleCityClick} = props;

  return (
    <ul className="locations__list tabs__list">
      {cities.map((item, i) => (
        <City
          key={i}
          activeCity={city}
          city={item.name}
          handleCityClick={handleCityClick} />
      ))}
    </ul>
  );
};

Cities.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.object).isRequired,
  city: PropTypes.string.isRequired,
  handleCityClick: PropTypes.func,
};

const mapStateToProps = (state) => ({
  cities: state.cities,
});

const mapDispatchToProps = (dispatch) => ({
  handleCityClick(city) {
    dispatch(ActionCreator.setCity(city));
    dispatch(ActionCreator.setOffers());
  },
});

export {Cities};
export default connect(mapStateToProps, mapDispatchToProps)(Cities);
