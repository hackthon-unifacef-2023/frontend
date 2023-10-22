import React, { useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Context } from '../common/context/context';
import Loading from '../common/components/Loading/index';
import NavbarComponent from '../common/components/Navbar';
import PropTypes from 'prop-types';

const CustomRoute = ({ isPrivate, exact, path, component }) => {
  const { loading } = useContext(Context);
  const { setAuth } = useContext(Context);
  const history = useHistory();

  useEffect(async () => {
    if (isPrivate) {
      const hasToken = localStorage.getItem('TOKEN_KEY');

      if (!hasToken) {
        history.push('/login');
      }
    }
  }, []);

  return (
    <>
      {isPrivate && <NavbarComponent />}
      {loading && <Loading loadingState={loading} />}
      <Route exact={exact} path={path} component={component} />
    </>
  );
};

CustomRoute.propTypes = {
  isPrivate: PropTypes.bool,
  isAccountant: PropTypes.bool,
  exact: PropTypes.bool,
  path: PropTypes.string,
  component: PropTypes.any,
  history: PropTypes.func
};

export default CustomRoute;
