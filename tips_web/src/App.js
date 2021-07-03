import React, { useEffect } from 'react';
import {BrowserRouter as Router, Switch} from "react-router-dom";
import {Provider} from 'react-redux';
import store from './redux/store';
import Auth from './Components/Authorization';
import {createBrowserHistory} from 'history'


const App = () => {
  const history = createBrowserHistory()

  history.push('/login');

  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Auth />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
