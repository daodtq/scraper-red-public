// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import {GoogleOAuthProvider} from '@react-oauth/google';
import { PersistGate } from "redux-persist/integration/react";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
// Define the path to tiktok.xlsx
const root = ReactDOM.createRoot(document.getElementById("root"));  
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <GoogleOAuthProvider clientId="89602650243-pni7p799kse8avn22jvncscrj6rdjm1i.apps.googleusercontent.com">
        <App /></GoogleOAuthProvider>;
        <NotificationContainer /> 
    </PersistGate>
  </Provider>
);
