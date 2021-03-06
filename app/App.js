import React from 'react';
import {Provider} from 'react-redux';
import storeConfigure from './store/storeConfig';
//import './style/App.less';
import './static/common.scss'
import './static/style.css'
/**
 * 配置redux
 */

import App from './router/RouterMap';

export default () => (
    <Provider  store={storeConfigure()}>
        <App/>
    </Provider>
);