import React from "react";
import PropTypes from "prop-types";

const City = React.memo(function City(props) {
  const {activeCity, city, handleCityClick} = props;

  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${city.toLowerCase() === activeCity.toLowerCase() ? `tabs__item--active` : ``}`}
        onClick={() => handleCityClick(city)}>
        <span>{city}</span>
      </a>
    </li>
  );
});

City.propTypes = {
  activeCity: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  handleCityClick: PropTypes.func,
};

export default City;

