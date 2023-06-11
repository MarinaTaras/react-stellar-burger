import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, legacy_createStore as createStore} from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers/index';
import { Provider } from "react-redux";

// создаем хранилище
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);


reportWebVitals();
