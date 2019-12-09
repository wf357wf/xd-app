/**
 * @author wf
 * @date 2019/11/30
 */
import { call } from '../utils/call'
export default class System {
  static getInterfaceList = ({ custNo }) => {
    return call({
      method: 'GET',
      url: `/ReleAgAcctUri/getReleAgAcctList`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      },
      params: {
        page: 1,
        limit: 100,
        agNo: custNo
      }
    })
  }
  static addInterfaceList = ({ Filter }) => {
    return new Promise((resolve, reject) => {
      resolve(call({
        method: 'POST',
        url: `/ReleAgAcctUri/addReleAgAcct`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        },
        data: Filter
      }).then(res => {
        return Promise.resolve(res.data)
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
  static delInterfaceList = ({ Filter }) => {
    return call({
      method: 'DELETE',
      url: `/ReleAgAcctUri/delReleAgAcct`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      },
      params: {
        custNo: Filter.custNo,
        cardNum: Filter.cardNum
      }
    })
  }
  static getAwardList = ({ Filter }) => {
    return call({
      method: 'GET',
      url: `/AwardGainInfUri/getAwardBaseI`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      },
      params: {
        custNo: Filter.custNo,
        cardNum: Filter.cardNum
      }
    })
  }
  static getAwardGainRecordList = ({ custNo }) => {
    return call({
      method: 'GET',
      url: `/AwardGainInfUri/getAwardGainRecordList`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      },
      params: {
        page: 1,
        limit: 100,
        agNo: custNo
      }
    })
  }
}
