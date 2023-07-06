import React from 'react';
import './index.css';
import SocialApp from "./App";
import * as ReactDOMClient from 'react-dom/client';

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
    // <BrowserRouter basename={process.env.PUBLIC_URL}>
    <SocialApp />,
)