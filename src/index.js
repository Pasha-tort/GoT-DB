import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

import {createGlobalStyle} from 'styled-components';
import img from './img/fon.jpg';
import roboto300 from './fonts/Roboto-Light.ttf';
import roboto400 from './fonts/Roboto-Medium.ttf';
import roboto500 from './fonts/Roboto-Regular.ttf';

const Global = createGlobalStyle`
    * {
        font-family: 'Roboto';
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    body {
        background: url(${img}) top center no-repeat;
    }
    @font-face {
        font-family: 'Roboto';
        src: url(${roboto300}) format('truetype');
        font-weight: 300;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'Roboto';
        src: url(${roboto400}) format('truetype');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
    }
    @font-face {
        font-family: 'Roboto';
        src: url(${roboto500}) format('truetype');
        font-weight: 500;
        font-style: normal;
        font-display: swap;
    }
`

ReactDOM.render(
  <>
    <Global/>
    <App/>
  </>,
  document.querySelector('#root')
);


