import React from "react";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";
import orderBy from 'lodash/orderBy';

const Reviews = (props) => {
  const {comments} = props;
  return (
    <ul className="reviews__list">
      {orderBy(comments, [`date`], [`desc`]).slice(0, 10).map((comment) => (
        <Review
          key={`${comment.id}`}
          comment={comment}
        />)
      )}
    </ul>
  );
};

Reviews.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
};

export default Reviews;
