import './index.css';

import App from './App';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { store } from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);