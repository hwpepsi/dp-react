import * as actionTypes from '../constants/collect.js'

const initialState = [];

export default function store(state = initialState,action){
	switch(action.type){
		case actionTypes.USERINFO_UPDATE:
		    return action.data
		case actionTypes.STORE_ADD:
		    state.unshift(action.data)
		    return state
		case actionTypes.STORE_RM:
		    return state.filter(item => { //数组的单个元素
		        if (item.id !== action.data.id) {
		            return item
		        }
		    })
		default:
		    return state
	}
}