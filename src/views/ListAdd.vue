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
                   @click-right-icon="$toast('question')" />

        <van-field v-model="item.cardNum"
                   clearable
                   type="number"
                   label="卡号"
                   left-icon="credit-pay"
                   placeholder="请输入卡号" />
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
        cardNum: ''
      }],
      userName: '',
      cardNum: '',
      custNo: '815100129661289',
      custName: '任敏碧'
    }
  },
  methods: {
    add () {
      let value = {
        userName: "",
        cardNum: ''
      }
      this.lists.push(value)
    },
    sure () {
      let Filter = {}
      Filter.lists = this.lists
      Filter.custNo = this.custNo
      Filter.custName = this.custName
      let jsonStr = JSON.stringify(Filter);
      console.log(this.lists)
      console.log(Filter)
      console.log(jsonStr)
      this.init(jsonStr)
      // store.commit('increase', this.lists)
      // this.$router.go(-1)
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    plotClick (item, index) {
      Dialog.confirm({
        message: '确定删除吗？'
      }).then(() => {
        this.del(index)
      }).catch(() => {
        console.log('2222', index)
      })
    },
    del (index) {
      this.lists.splice(index, 1)
    },
    init (jsonStr) {
      System.addInterfaceList({ Filter: jsonStr }).then(res => {
        console.log('666', res)
        if (res.retCode === '0') {
          console.log('0')
        } else {
          console.log('1')
        }
      }).catch(err => {
        console.log(err)
      })
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
