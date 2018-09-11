import React from 'react';
import { render } from 'react-dom';

// React Router related
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

// Redux related
import { Provider } from 'react-redux';
import store from './store';

// Containers
import App from './containers/app/App';
import NotFound from './containers/app/NotFound';
import LandingPage from './containers/home/LandingPage';
import CatInfo from './containers/components/CatInfo';

// Styles
import './styles/styles.scss';

render((
  <Provider
    store={store}
  >
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/catinfo" component={CatInfo}/>
          <Route path="/catinfo/:id" component={CatInfo}/>
          <Route component={NotFound}/>
        </Switch>
      </App>
    </Router>
  </Provider>
), document.getElementById('app'));
