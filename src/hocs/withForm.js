import React, {PureComponent} from 'react';
import PropTypes from "prop-types";

const withForm = (Component) => {
  class WithForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: null,
        comment: ``,
        isBlockButton: true,
        isBlockForm: false,
      };

      this.changeFormButton = this.changeFormButton.bind(this);
      this.changeFormData = this.changeFormData.bind(this);
    }

    changeFormButton() {
      const buttonBlocked = !this.state.rating || this.state.comment.length < 50;
      this.setState({isBlockButton: buttonBlocked});
    }

    changeFormData(data) {
      this.setState(data, () => {
        this.changeFormButton(); // when state already set
      });
    }

    render() {
      const {rating, comment, isBlockButton, isBlockForm} = this.state;

      return <Component
        {...this.props}
        rating={rating}
        comment={comment}
        setHocState={this.changeFormData}
        isBlockButton={isBlockButton}
        isBlockForm={isBlockForm}
      />;
    }
  }

  WithForm.propTypes = {
    selectedTitleId: PropTypes.number.isRequired,
  };

  return WithForm;
};

export default withForm;


