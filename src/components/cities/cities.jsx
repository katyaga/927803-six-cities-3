import React from "react";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer";
import {connect} from "react-redux";

const Cities = (props) => {
  const {cities, city, handleCityClick} = props;

  return (
    <ul className="locations__list tabs__list">
      {cities.map((item, i) => (
        <li key={i} className="locations__item">
          <a className={`locations__item-link tabs__item ${item.name.toLowerCase() === city.toLowerCase() ? `tabs__item--active` : ``}`}
            onClick={() => handleCityClick(item.name)}>
            <span>{item.name}</span>
          </a>
        </li>
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
