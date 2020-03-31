import React from "react";
import PropTypes from "prop-types";
import {SortType} from "../../const";

const sortTypeHandler = () => {
  const sortTypeList = document.querySelector(`.places__options`);

  if (sortTypeList.classList.contains(`places__options--opened`)) {
    sortTypeList.classList.remove(`places__options--opened`);
  } else {
    sortTypeList.classList.add(`places__options--opened`);
  }
};

const Sorting = React.memo(function Sorting(props) {
  const {sortType, onSortTypeClick} = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" onClick={() => sortTypeHandler()}>
        {SortType[sortType]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom">
        {Object.keys(SortType).map((type, i) =>
          <li key={i} className={`places__option ${type === sortType ? `places__option--active` : ``}`}
            tabIndex="0" onClick={() => onSortTypeClick(type)}>
            {SortType[type]}
          </li>
        )}
      </ul>
    </form>
  );
});

Sorting.propTypes = {
  sortType: PropTypes.oneOf(Object.keys(SortType)).isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
};

export default Sorting;

