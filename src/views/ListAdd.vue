<template>
    <div class="list">
        <van-nav-bar
          title="添加"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
        />
        <van-cell-group>
          <van-field
            v-model="userName"
            clearable
            label="户名"
            left-icon="contact"
            placeholder="请输入户名"
            @click-right-icon="$toast('question')"
          />

          <van-field
            v-model="cardNum"
            clearable
            type="number"
            label="卡号"
            left-icon="credit-pay"
            placeholder="请输入卡号"
          />
        </van-cell-group>
        <div class="btn-bottom">
          <van-button type="primary" size="large" @click="add()">添加</van-button>
        </div>
    </div>
</template>
<script>
import store from '@/store'
import { Button, Icon, Dialog, NavBar, Toast, Field, CellGroup } from 'vant'
export default {
  name: 'listadd',
  store,
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup
  },
  data () {
    return {
      userName: '',
      cardNum: ''
    }
  },
  methods: {
    add () {
      store.commit('addItem', {
        userName: this.userName,
        cardNum: this.cardNum
      })
      this.userName = ''
      this.cardNum = ''
      this.$router.go(-1)
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.btn-bottom {
  width: 100%;
  position: absolute;
  bottom: 10px;
}
</style>
