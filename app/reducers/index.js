import {combineReducers} from 'redux';

import userinfo from './userinfo' //同目录下的 userinfo.js文件
import store from './store' //同目录下的 userinfo.js文件

//定义计算规则
const rootReducer = combineReducers({
	userinfo,//等同于userinfo:userinfo
	store 
})

export default rootReducer