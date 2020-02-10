import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const Settings = {
  OFFERS_COUNT: 312,
  OFFERS_NAMES:
    [`Beautiful &amp; luxurious apartment at great location`,
      `Wood and stone place`,
      `Canal View Prinsengrach`,
      `Nice, cozy, warm big bed apartment`]
};

ReactDOM.render(
    <App offersCount = { Settings.OFFERS_COUNT } offersNames = { Settings.OFFERS_NAMES }
    />,
    document.querySelector(`#root`)
);
