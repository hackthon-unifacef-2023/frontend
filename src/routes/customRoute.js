import React, { useContext, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';
import { useHistory } from 'react-router';
import { Context } from '../common/context/context';
import Loading from '../common/components/Loading/index';
import NavbarComponent from '../common/components/Navbar';
import PropTypes from 'prop-types';

const CustomRoute = ({ isPrivate, exact, path, component, isAdmin, isAccountant }) => {
  const { loading } = useContext(Context);
  const history = useHistory();
  const { setAuth } = useContext(Context);

  useEffect(async () => {
    if (isPrivate) {
      const isAuth = await isAuthenticated();

      if (!isAuth.success) {
        history.push('/login');
      }

      setAuth(isAuth.data.data);
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
  isAdmin: PropTypes.bool,
  isAccountant: PropTypes.bool,
  exact: PropTypes.bool,
  path: PropTypes.string,
  component: PropTypes.any,
  history: PropTypes.func
};

export default CustomRoute;
