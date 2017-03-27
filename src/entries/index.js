import './index.less';
import ReactDOM from 'react-dom';
import React from 'react';
import { syncHistoryWithStore } from "react-router-redux";
//import {store} from "../entries";
import {hashHistory,Router,browserHistory} from "react-router";
import {action_changeAddress} from "../actions/menuAction";
// 利用Provider可以使我们的 store 能为下面的组件所用 connect 是监听（入口文件这边用不着）
import {Provider} from "react-redux";

//import DevTools from "../reduxConfig/reduxDevtools"; // 引入Redux调试工具DevTools
import RouterConfig from '../routerConfig/router';   // 引入路由配置

import store from "../reduxConfig/store";//引入配置好的store

//给增强后的store传入reducer
const history = syncHistoryWithStore(hashHistory, store);

history.listen(location => {
    //console.log("进入路由监听");
    store.dispatch(action_changeAddress(location.pathname));
});

//syncHistoryWithStore 刷新的时候监听不到，修复bug 只能手动 加入一次
let pathName = store.getState().routing.locationBeforeTransitions;
//console.log("pathName",pathName.pathname);
store.dispatch(action_changeAddress(pathName.pathname));


ReactDOM.render(
    <Provider store={store}>    
        <Router history={hashHistory} routes={RouterConfig} />
        {/*<DevTools />*/}    
    </Provider>
    ,document.getElementById('root')
);