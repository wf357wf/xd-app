/**
 * @author wf
 * @date 2019/12/5
 * @Description:
 */
const checkChineseName = function checkChineseName (name) {   //中文名校验
  var retCode, retMsg
  var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
  if (name === '') {
    retCode = '9999'
    retMsg = '请填写户名'
    return [retCode, retMsg]
  }
  if (reg.test(name)) {
    retCode = '0000'
    retMsg = ''
  } else {
    retCode = '9999'
    retMsg = '请输入正确的中文名！'
  }
  return [retCode, retMsg]
}
export default checkChineseName