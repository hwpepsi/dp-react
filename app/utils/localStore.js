/**
 * Created by hw on 2017/9/10.
 */
export default {
    getItem: function (key) {
        let value = ''
        try {
            value = localStorage.getItem(key)
        } catch (ex){
            if (__DEV__){
                console.log('报错 找不到' + key + "的值")
            }  
        } finally {
            return value
        }
    },
    setItem: function (key, value) {
        try {
            localStorage.setItem(key,value)
        } catch(ex) {
            if (__DEV__){
                console.log('设置失败')
            }
        }
    }
}