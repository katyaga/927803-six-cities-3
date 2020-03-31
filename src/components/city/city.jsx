import React from "react";
import PropTypes from "prop-types";

const City = React.memo(function City(props) {
  const {activeCity, city, onCityClick} = props;

  return (
    <li className="locations__item">
      <a className={`locations__item-link tabs__item ${city.toLowerCase() === activeCity.toLowerCase() ? `tabs__item--active` : ``}`}
        onClick={() => onCityClick(city)}>
        <span>{city}</span>
      </a>
    </li>
  );
});

City.propTypes = {
  activeCity: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  onCityClick: PropTypes.func,
};

export default City;

