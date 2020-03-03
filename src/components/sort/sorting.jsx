import React from "react";
import PropTypes from "prop-types";
import {SortType} from "../../const";

const Sorting = (props) => {
  const {sortType, onSortTypeClick} = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex="0">
        {SortType[sortType]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {Object.keys(SortType).map((type, i) =>
          <li key={i} className={`places__option ${type === SortType.sortType ? `places__option--active` : ``}`}
            tabIndex="0" onClick={() => onSortTypeClick(type)}>
            {SortType[type]}
          </li>
        )}
      </ul>
    </form>
  );
};

Sorting.propTypes = {
  sortType: PropTypes.oneOf(Object.keys(SortType)).isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
};

export default Sorting;

