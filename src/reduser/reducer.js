import {combineReducers} from "redux";
import {reducer as offers} from "./offers/offers.js";
import {reducer as user} from "./user/user.js";
import NameSpace from "./name-space.js";

export default combineReducers({
  [NameSpace.OFFERS]: offers,
  [NameSpace.USER]: user,
});
