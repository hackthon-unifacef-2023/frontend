import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0
    
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
   
    input[type=number] {
      -moz-appearance: textfield;
    }
  }
`;
