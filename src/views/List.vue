<template>
  <div class="list">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-rate v-model="value" />
    <van-swipe-cell
      class="swipe"
      v-for="(item, index) in list"
      :key="index"
      :on-close="onClose"
      >
      <van-cell>
        <div class="content">
          <van-icon
            name="card"
            size="16px"
            />
          <span>户名 ：</span>
          <span>{{item.name}}</span>
          <span>卡号 ：</span>
          <span>{{item.num}}</span>
        </div>
      </van-cell>
      <template slot="right">
        <van-button square type="danger" text="删除" />
      </template>
    </van-swipe-cell>
    <van-button type="primary" size="large">大号按钮</van-button>
  </div>
</template>
<script>
import store from '@/store'
import { Button, SwipeCell, Rate, Cell, CellGroup, Icon, Dialog, NavBar, Toast } from 'vant'
export default {
  name: 'list',
  store,
  components: {
    [Button.name]: Button,
    [SwipeCell.name]: SwipeCell,
    [Rate.name]: Rate,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast
  },
  data () {
    return {
      msg: store.state.count,
      value: 3,
      checked: true,
      list: [
        { name: '任我行', num: '9999999999999999' },
        { name: '令狐冲', num: '8888888888888888' },
        { name: '裘千仞', num: '7777777777777777' },
        { name: '欧阳锋', num: '6666666666666666' },
        { name: '张三丰', num: '5555555555555555' }
      ]
    }
  },
  methods: {
    add () {
      console.log('add')
      store.commit('increase')
    },
    onClose (clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
          instance.close()
          break
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            instance.close()
          }).catch(() => {
            instance.close()
          })
          break
      }
    },
    onClickLeft () {
      Toast('返回')
      this.$router.go(-1)
    },
    onClickRight () {
      Toast('按钮')
    }
  }
}
</script>
<style scoped>
.list {
  background-color: #eee;
}
.swipe {
  height: 100%;
}
.content {
 display: flex;
 align-items: center;
}
</style>
