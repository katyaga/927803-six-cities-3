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
      };
      this.props = props;

      this.handleResetForm = this.handleResetForm.bind(this);
      // this.handleChangeData = this.handleChangeData.bind(this);
    }

    // handleChangeData(rating, comment, isBlockButton) {
    //   console.log(rating, comment);
    //   this.setState({
    //     rating: rating,
    //     comment: comment,
    //     isBlockButton: isBlockButton,
    //   });
    //   console.log(`handleChangeData`, this.state);
    // }

    handleResetForm() {
      this.setState({
        rating: null,
        comment: ``,
      }
      );
    }

    render() {
      const {rating, comment, isBlockButton} = this.state;

      return <Component
        {...this.props}
        rating={rating}
        comment={comment}
        setState={this.setState.bind(this)}
        isBlockButton={isBlockButton}
        handleResetForm={this.handleResetForm}
        handleChangeData={this.handleChangeData}
      />;
    }
  }

  WithForm.propTypes = {
    selectedTitleId: PropTypes.number.isRequired,
  };

  return WithForm;
};

export default withForm;


