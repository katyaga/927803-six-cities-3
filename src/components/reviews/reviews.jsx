import React from "react";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";
import orderBy from 'lodash/orderBy';
// import ReviewsForm from "../reviews-form/reviews-form.jsx";

const Reviews = (props) => {
  const {comments} = props;
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {orderBy(comments, [`date`], [`desc`]).slice(0, 10).map((comment) => (
          <Review
            key={`${comment.id}`}
            comment={comment}
          />)
        )}
      </ul>
    </section>
  );
};

Reviews.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
};

export default Reviews;
