import React from "react";
import PropTypes from "prop-types";
import {formatMonthYear, formatDate} from "../../utils";

const Review = (props) => {
  const {comment} = props;
  const {authorAvatar, authorName, rating, text, date} = comment;
  const starRating = {
    width: `${rating * 20}%`,
  };

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={authorAvatar} width="54"
            height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">{authorName}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={starRating}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {text}
        </p>
        <time className="reviews__time" dateTime={formatDate(date)}>{formatMonthYear(date)}</time>
      </div>
    </li>
  );
};

Review.propTypes = {
  comment: PropTypes.shape({
    authorAvatar: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
  }).isRequired,
};

export default Review;
