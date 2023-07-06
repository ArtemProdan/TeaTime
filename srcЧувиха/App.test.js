import React from 'react';
import { render } from '@testing-library/react';
import AppContainer from "./App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import App from "./App";
import ReactDOM from "react-dom";
import SocialApp from "./App";

// test('renders learn react link', () => {
//   const { getByText } = render(<AppContainer />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

 test('render without crashing', () => {
   const div = document.createElement('div');
   ReactDOM.render(<SocialApp/>, div);
   ReactDOM.unmountComponentAtNode(div)
 })