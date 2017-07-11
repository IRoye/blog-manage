import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './style/main.scss';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Router, browserHistory} from 'react-router';
import getRoutes from './routes';
import { Provider } from 'react-redux';

import store, {history} from './redux/store';   

injectTapEventPlugin();

<Router history={history} />

const router = <Provider store={store}>{getRoutes()}</Provider>

render(
router,
document.getElementById('root')
);
