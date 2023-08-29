import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import CustomToaster from './components/atoms/CustomToaster/CustomToaster';
import './index.css';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <CustomToaster />
    </Provider>
  </React.StrictMode>
);
