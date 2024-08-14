import React from 'react';
import AppNavigator from './navigation';
import { Provider } from 'react-redux';
import { store } from './store/store';


const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
