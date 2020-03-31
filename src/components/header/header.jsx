import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";
import {getAuthorizationStatus, getUser} from "../../reduser/user/selectors";

const Header = (props) => {
  const {authorizationStatus, user} = props;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to={AppRoute.ROOT}>
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81"
                height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {authorizationStatus === `AUTH` ?
                  <Link className="header__nav-link header__nav-link--profile"
                    to={AppRoute.FAVORITES}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      <img src={`https://htmlacademy-react-3.appspot.com/six-cities${user.avatarUrl}`} width="100%" height="100%" style={{borderRadius: `50%`}} alt="Users photo" />
                    </div>
                    <span className="header__user-name user__name">
                      {user.email}
                    </span>
                  </Link>
                  :
                  <Link className="header__nav-link header__nav-link--profile"
                    to={AppRoute.LOGIN}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">
                      Sign in
                    </span>
                  </Link>
                }
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  user: PropTypes.shape({
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    isSuper: PropTypes.bool,
    name: PropTypes.string,
  })
};

const mapStateToProps = (state) => ({
  user: getUser(state),
  authorizationStatus: getAuthorizationStatus(state),
});

export {Header};
export default connect(mapStateToProps)(Header);

