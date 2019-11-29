<template>
  <div class="list">
    <van-nav-bar title="代理分销"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft" />
    <div v-if="pageLists.length > 0">
      <van-swipe-cell class="swipe"
                      v-for="(item, index) in pageLists"
                      :key="index">
        <van-cell>
          <div class="content">
            <div>
              <span>户名 ：</span>
              <span>{{item.userName}}</span>
            </div>
            <div>
              <span>卡号 ：</span>
              <span>{{item.cardNum}}</span>
            </div>
          </div>
        </van-cell>
        <template slot="right">
          <van-button square
                      type="danger"
                      text="删除"
                      class="delBtn"
                      @click="plotClick(item,index)" />
        </template>
      </van-swipe-cell>
    </div>
    <div v-else
         class="bg">
      <img src="../assets/img/listBg.png"
           class="bgImg">
      <p class="bgText">您暂无关联账户</p>
    </div>
    <div class="btn-bottom">
      <van-button type="primary"
                  size="large"
                  @click="add()">关联新账户</van-button>
    </div>
  </div>
</template>
<script>
import store from '@/store'
import { Button, SwipeCell, Cell, CellGroup, Icon, Dialog, NavBar, Toast, Image } from 'vant'
export default {
  name: 'list',
  store,
  components: {
    [Button.name]: Button,
    [SwipeCell.name]: SwipeCell,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Image.name]: Image
  },
  computed: {
    pageLists () {
      return store.state.lists
    }
  },
  data () {
    return {
      msg: store.state.count,
      value: 3,
      checked: true
    }
  },
  methods: {
    add () {
      console.log('add')
      this.$router.push('/ListAdd')
      store.commit('increase')
    },
    onClickLeft () {
      Toast('返回')
      this.$router.go(-1)
    },
    plotClick (item, index) {
      console.log(item)
      Dialog.confirm({
        message: '确定删除吗？'
      }).then(() => {
        console.log('1111', index)
      }).catch(() => {
        console.log('2222', index)
      })
    }
  }
}
</script>
<style scoped>
.list {
  background-color: #fff;
}
.swipe {
  height: 100%;
}
.content {
  flex-flow: column;
  align-items: center;
}
.btn-bottom {
  width: 100%;
  position: absolute;
  bottom: 10px;
}
.bg {
  flex-flow: column;
  align-items: center;
  justify-items: center;
  margin-top: 100px;
}
.bgImg {
  width: 50%;
}
.bgText {
  font-size: 12px;
  color: #8d8d8d;
}
.delBtn {
  height: 100%;
}
</style>
