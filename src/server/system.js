/**
 * @author wf
 * @date 2018/11/30
 */
import { call } from '../utils/call'
export default class System {
  static getInterfaceList = ({ Filter }) => {
    return new Promise((resolve, reject) => {
      resolve(call({
        method: 'GET',
        url: `/AppAgTempUri/getAppAgTempList`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
          reqheader: {
            SERVICECODE: 'getAppAgTempList'
          },
          reqbody:
          {
            page: 1,
            limit: 100
          }
        }
      }).then(res => {
        return Promise.resolve(res.data.rspbody)
      }).catch(err => {
        console.log(err)
        return Promise.resolve({
          'retCode': '1',
          'retMsg': '网络异常',
          'data': 'first_login:1'
        })
      }))
    })
  }
}
