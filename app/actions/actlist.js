import * as actionTypes from '../constants/consinfo'

//触发数据变化
export function login(data){
	return {
		type:actionTypes.USERINFO_LOGIN,
		data
	}
}

export function updateCityName(data){
	return {
		type:actionTypes.UPDATE_CITYNAME,
		data
	}
}