import React from "react";
import Main from "../main/main.jsx";

const titleClickHandler = () => {};

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {offersCount, offersNames} = props;

  return (
    <Main
      offersCount={offersCount}
      offersNames={offersNames}
      onTitleClick={titleClickHandler}
    />
  );
};

export default App;
