import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from '~/components/layout';
import routes from '~react-pages';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  );
}

function Routes() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {useRoutes(routes)}
    </Suspense>
  );
}
