import React from 'react';
import Routes from './routes';
import AlertTemplate from 'react-alert-template-basic';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { GlobalStyle } from './globalStyle';
import { BrowserRouter } from 'react-router-dom';
import { ContextProvider } from './common/context/context';
import 'bootstrap/dist/css/bootstrap.min.css';

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '5px',
  transition: transitions.SCALE,
};

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ContextProvider>
        <AlertProvider template={AlertTemplate} {...options}>
          <Routes />
        </AlertProvider>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
