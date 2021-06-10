import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import LogIn from './Components/Authorization/LogIn'


const App = () => {
  return (
    <Provider store={store}>
      <LogIn />
    </Provider>
  );
}

export default App;
