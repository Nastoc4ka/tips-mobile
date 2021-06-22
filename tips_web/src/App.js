import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createBrowserHistory } from "history";
import Main from "./Components/Main";

const App = () => {
  const history = createBrowserHistory();

  return (
    <Provider store={store}>
      <Router history={history}>
        <Main />
      </Router>
    </Provider>
  );
};

export default App;
