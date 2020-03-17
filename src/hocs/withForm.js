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
    }

    changeFormButton() {
      const isBlockButton = () => {
        return (!this.state.rating || this.state.comment.length < 50);
      };
      this.setState({isBlockButton: isBlockButton()});
    }

    render() {
      const {rating, comment, isBlockButton, isBlockForm} = this.state;

      return <Component
        {...this.props}
        rating={rating}
        comment={comment}
        setHocState={this.setState.bind(this)}
        isBlockButton={isBlockButton}
        isBlockForm={isBlockForm}
        handleFormButton={this.changeFormButton}
      />;
    }
  }

  WithForm.propTypes = {
    selectedTitleId: PropTypes.number.isRequired,
  };

  return WithForm;
};

export default withForm;


