import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from './layout';

import Router from './router';
import { store } from './store';
import './global.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
