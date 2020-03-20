import React, {Fragment, PureComponent} from "react";
import PropTypes from "prop-types";
import {Operation} from "../../reduser/offers/offers";
import {connect} from "react-redux";
import {RATING_TITLES} from "../../const";

class ReviewsForm extends PureComponent {
  constructor(props) {
    super(props);

    this.rating = this.props.rating;
    this.comment = this.props.comment;
    this._changeFormButton = this.props.handleFormButton;
    this.setHOCState = this.props.setHocState;

    this._onSubmit = this._onSubmit.bind(this);
    this._onInputCheck = this._onInputCheck.bind(this);
    this._onTextChange = this._onTextChange.bind(this);
  }

  _onSubmit(evt) {
    evt.preventDefault();
    const {onFormSubmit, selectedTitleId} = this.props;

    this.setHOCState({
      rating: this.rating,
      comment: this.comment,
      isBlockForm: true,
      isBlockButton: true,
    });

    onFormSubmit(selectedTitleId, {
      rating: this.rating,
      comment: this.comment,
    }).then(() => {
      this.setHOCState({
        rating: null,
        comment: ``,
        isBlockForm: false
      });

    }).catch(() => {
    });
  }

  _onInputCheck(evt) {
    this.rating = Number.parseInt(evt.target.value, 10);

    this.setHOCState({
      rating: this.rating,
    });
    this._changeFormButton();
  }

  _onTextChange(evt) {
    this.comment = evt.target.value;

    this.setHOCState({
      comment: this.comment,
    });
    this._changeFormButton();
  }

  render() {
    const {rating, comment, isBlockButton, isBlockForm} = this.props;

    return (
      <form className="reviews__form form" action="#" method="post" onSubmit={this._onSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">

          {RATING_TITLES.map((title, index) => (
            <Fragment key={index}>
              <input className="form__rating-input visually-hidden"
                name="rating"
                value={5 - index} id={`${5 - index}-stars`}
                type="radio"
                onChange={this._onInputCheck}
                checked={rating === 5 - index}
                disabled={isBlockForm}/>

              <label htmlFor={`${5 - index}-stars`} className="reviews__rating-label form__rating-label" title={RATING_TITLES[index - 1]}>
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))}

        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review" value={comment} disabled={isBlockForm}
          placeholder="Tell how was your stay, what you like and what can be improved" onChange={this._onTextChange} maxLength={300}>
        </textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span>
            and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled={isBlockForm || isBlockButton}>Submit</button>
        </div>
      </form>
    );
  }
}

ReviewsForm.propTypes = {
  rating: PropTypes.number,
  comment: PropTypes.string.isRequired,
  isBlockButton: PropTypes.bool.isRequired,
  isBlockForm: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  handleFormButton: PropTypes.func.isRequired,
  setHocState: PropTypes.func.isRequired,
  selectedTitleId: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit(id, comment) {
    return dispatch(Operation.sendComment(id, comment));
  },
});

export {ReviewsForm};
export default connect(null, mapDispatchToProps)(ReviewsForm);
