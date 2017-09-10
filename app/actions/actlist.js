import * as actionTypes from '../constants/consinfo'

//触发数据变化
export function update(data){
	return {
		type:actionTypes.USERINFO_UPDATE,
		data
	}
}