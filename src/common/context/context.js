import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState();

  return (
    <Context.Provider value={{ loading, setLoading, auth, setAuth }}>{children}</Context.Provider>
  );
};

ContextProvider.propTypes = { children: PropTypes.any };

export { Context, ContextProvider };
