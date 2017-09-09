import axios from 'axios'

export function get(url) {
    var result = axios({
  			method:'get',
  			url:url,
  			responseType:'stream'
	})
	
    return result
}