import React from "react";
import Main from "../main/main.jsx";

const titleClickHandler = () => {};

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {offersCount, offersShownCards, offersNames} = props;

  return (
    <Main
      offersCount={offersCount}
      offersShownCards={offersShownCards}
      offersNames={offersNames}
      onTitleClick={titleClickHandler}
    />
  );
};

export default App;
