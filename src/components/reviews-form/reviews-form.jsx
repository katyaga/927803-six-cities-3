import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Operation} from "../../reduser/offers/offers";
import {connect} from "react-redux";
// import {getSelectedTitleId} from "../../reduser/offers/selector";

class ReviewsForm extends PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
    this.rating = null;
    this.comment = ``;
    this.setHOCState = props.setState;

    this._onSubmit = this._onSubmit.bind(this);
    this._onInputCheck = this._onInputCheck.bind(this);
    this._onTextChange = this._onTextChange.bind(this);
    this._changeFormButton = this._changeFormButton.bind(this);
  }

  componentDidUpdate() {
    this._changeFormButton();
  }

  _onSubmit(evt) {
    evt.preventDefault();

    const {onFormSubmit, selectedTitleId} = this.props;
    console.log(this.rating, this.comment);

    this.setHOCState({
      rating: this.rating,
      comment: this.comment,
    });

    onFormSubmit(selectedTitleId, {
      rating: this.rating,
      comment: this.comment,
    },
    () => {
      this.setHOCState({
        rating: null,
        comment: ``,
      });
      this._resetForm();
    }
    );
  }

  _resetForm() {
    this.render();
  }

  _onInputCheck(evt) {
    this.rating = Number.parseInt(evt.target.value, 10);
    this._changeFormButton();
  }

  _onTextChange(evt) {
    this.comment = evt.target.value;
    this._changeFormButton();
  }

  _changeFormButton() {
    const button = document.querySelector(`.reviews__submit`);
    const isBlockButton = () => {
      return (!this.rating || this.comment.length < 50);
    };
    button.disabled = isBlockButton();
  }

  render() {
    const {rating, comment} = this.props;
    console.log(rating, comment);
    this.rating = rating;
    this.comment = comment;

    return (
      <form className="reviews__form form" action="#" method="post" onSubmit={this._onSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={this._onInputCheck}/>
          <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={this._onInputCheck}/>
          <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={this._onInputCheck}/>
          <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={this._onInputCheck}/>
          <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>

          <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={this._onInputCheck}/>
          <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </div>
        <textarea className="reviews__textarea form__textarea" id="review" name="review"
          placeholder="Tell how was your stay, what you like and what can be improved" onChange={this._onTextChange} maxLength={300}>
        </textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
        </div>
      </form>
    );
  }
}

ReviewsForm.propTypes = {
  rating: PropTypes.number,
  comment: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  handleResetForm: PropTypes.func.isRequired,
  handleChangeData: PropTypes.func.isRequired,
  selectedTitleId: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit(id, comment, callback) {
    dispatch(Operation.sendComment(id, comment, callback));
  },
});

export {ReviewsForm};
export default connect(null, mapDispatchToProps)(ReviewsForm);
