<template>
  <div class="list">
    <van-nav-bar title="添加"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft" />
    <div class="list-content">
      <van-cell-group class="formItem"
                      v-for="(item, index) in lists"
                      :key="index">
        <div class="flex-content">
          <span class="title">关联账户{{index+1}}</span>
          <van-icon name="delete"
                    color="red"
                    @click="plotClick(item,index)" />
        </div>
        <van-field v-model="item.userName"
                   clearable
                   label="户名"
                   left-icon="contact"
                   placeholder="请输入户名"
                   :error-message=item.errMsgUserName
                   @blur="_doformpd('userName', item.userName, item)" />

        <van-field v-model="item.cardNum"
                   clearable
                   type="number"
                   label="卡号"
                   left-icon="credit-pay"
                   placeholder="请输入卡号"
                   :error-message=item.errMsgCardNum
                   @blur="_doformpd('cardNum', item.cardNum, item)" />
      </van-cell-group>
    </div>
    <div class="btn-bottom">
      <van-button plain
                  type="primary"
                  color="#DD4D4F"
                  text="新建"
                  class="btn"
                  @click="add()"></van-button>
      <van-button type="primary"
                  size="normal"
                  color="#DD4D4F"
                  text="确定"
                  class="btn"
                  @click="sure()"></van-button>
    </div>
  </div>
</template>
<script>
import store from '@/store'
import { Button, Icon, Dialog, NavBar, Toast, Field, CellGroup, Cell } from 'vant'
import System from '../service/system'
import checkBank from '../utils/checkBank'
import checkChineseName from '../utils/checkChineseName'
export default {
  name: 'listadd',
  store,
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [Dialog.name]: Dialog,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup
  },
  data () {
    return {
      lists: [{
        userName: "",
        cardNum: '',
        errMsgCardNum: '',
        errMsgUserName: ''
      }],
      custNo: '815100129661289',
      custName: '任敏碧',
      refObj: this.$route.params.refObj,
    }
  },
  methods: {
    add () {
      let value = {
        userName: "",
        cardNum: '',
        errMsgCardNum: '',
        errMsgUserName: ''
      }
      this._checkUN()
      this._checkCN()
      if (this._checkUN() && this._checkCN()) { //校验列表信息，合法允许增加一条
        if (this.lists.length > this.refObj) {
          Toast('以达到绑定上限')
        } else {
          this.lists.push(value)
        }
      }
    },
    sure () {
      let that = this
      let list = this.lists
      this._checkUN()
      this._checkCN()
      if (this._checkUN() && this._checkCN()) { //校验添加列表信息
        let Filter = {}
        let newList = []
        for (let i = 0; i < list.length; i++) { //去除数组多余提示信息
          let obj = {}
          obj.userName = list[i].userName
          obj.cardNum = list[i].cardNum
          newList.push(obj)
        }
        Filter.lists = newList
        Filter.custNo = that.custNo
        Filter.custName = that.custName
        let jsonStr = JSON.stringify(Filter);
        this.init(jsonStr)
      }
    },
    onClickLeft () { // 返回上一页
      this.$router.go(-1)
    },
    plotClick (item, index) { // 删除提示框
      Dialog.confirm({
        message: '确定删除吗？'
      }).then(() => {
        this.del(index)
      }).catch(() => {
        console.log('2222', index)
      })
    },
    del (index) { // 删除
      this.lists.splice(index, 1)
    },
    init (jsonStr) { // 关联账户通信
      System.addInterfaceList({ Filter: jsonStr }).then(res => {
        if (res.code === 0) {
          Toast('绑定成功')
          this.$router.go(-1)
        } else {
          Toast(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    _checkUN () { // 验证用户名合法性
      let list = this.lists
      let flag = false
      for (let i = 0; i < list.length; i++) {
        let [retCodeUN, retMsgUN] = checkChineseName(list[i].userName)
        if (retCodeUN === '9999') {
          Toast(retMsgUN)
          list[i].errMsgUserName = retMsgUN
          flag = false
        } else {
          list[i].errMsgUserName = ''
          flag = true
        }
      }
      this.lists = list
      return flag
    },
    _checkCN () { // 验证银行卡号合法性
      let list = this.lists
      let flag = false
      for (let i = 0; i < list.length; i++) {
        let [retCodeCN, retMsgCN] = checkBank(list[i].cardNum)
        if (retCodeCN === '9999') {
          Toast(retMsgCN)
          list[i].errMsgCardNum = retMsgCN
          flag = false
        } else {
          list[i].errMsgCardNum = ''
          flag = true
        }
      }
      this.lists = list
      return flag
    },
    _doformpd (m, n, i) { // blur事件验证
      let that = this
      let list = that.lists
      if (m === 'userName') {
        for (let i = 0; i < list.length; i++) {
          that._checkUN()
        }
      }
      if (m === 'cardNum') {
        for (let i = 0; i < list.length; i++) {
          that._checkCN()
        }
      }
    }
  }
}
</script>
<style scoped>
.list-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
}
.btn-bottom {
  width: 100%;
  position: fixed;
  bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.formItem {
  margin-top: 10px;
  width: 96%;
}
.btn {
  width: 45%;
}
.flex-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid #eee;
}
.title {
  font-size: 10px;
  margin-left: 10px;
  color: #323233;
}
</style>
