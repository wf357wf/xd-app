/**
 * axios
 * Created by wf on 2019/11/30.
 */
import axios from 'axios'
import { url, timeout } from '../config'
import { Toast } from 'vant'
// 超时时间
axios.defaults.timeout = timeout
export function call (config) {
  const ax = axios.create({
    baseURL: url + '/service/rest',
    timeout: timeout
  })
  ax.interceptors.request.use(config => {
    Toast.loading({
      message: '通讯中...',
      forbidClick: true,
      duration: 0
    })
    return config
  }, error => {
    Toast.clear()
    Toast.fail('连接超时')
    return Promise.reject(error)
  })

  // 拦截返回请求做相应业务逻辑处理
  ax.interceptors.response.use(response => {
    Toast.clear()
    return Promise.resolve(response)
  }, error => {
    Toast.clear()
    Toast.fail('加载超时')
    return Promise.reject(error)
  })
  return ax.request(config)
}
