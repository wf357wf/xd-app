/**
 * @author wf
 * @date 2019/11/30
 */
import { call } from '../utils/call'
export default class System {
  static getInterfaceList = ({ page, limit }) => {
    return call({
      method: 'GET',
      url: `/ReleAgAcctUri/getReleAgAcctList`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      },
      params: {
        page: 1,
        limit: 1,
        agNo: '123456'
      }
    })
  }
  static addInterfaceList = ({ Filter }) => {
    return new Promise((resolve, reject) => {
      resolve(call({
        method: 'PUT',
        url: `/ReleAgAcctUri/addReleAgAcct`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
          Filter
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
