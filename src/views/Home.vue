<template>
  <div class="home">
    <img class="logo" src="../assets/logo.png">
    <div class="menuBox">
      <div class="menu">
        <van-divider :style="{ color: '#42b983', borderColor: '#42b983', padding: '0 16px' }">薪动平台</van-divider>
        <van-row type="flex" justify="space-around">
          <van-col span="6" @click="onList()">
            <div class="btn-item">
              <img src="../assets/img/icon-2.png" class="icon">
              <p class="text-item">代理分销</p>
            </div>
          </van-col>
          <van-col span="6" @click="onLucky()">
            <div class="btn-item">
              <img src="../assets/img/icon-3.png" class="icon">
              <p class="text-item">幸运转盘</p>
            </div>
          </van-col>
          <van-col span="6" @click="onMore()">
            <div class="btn-item">
              <img src="../assets/img/icon-1.png" class="icon">
              <p class="text-item">敬请期待</p>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Toast, Row, Col, Divider } from 'vant'
export default {
  name: 'home',
  components: {
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Row.name]: Row,
    [Col.name]: Col,
    [Divider.name]: Divider
  },
  methods: {
    onList () {
      this.$router.push('/List')
    },
    onLucky () {
      this.$router.push('/List')
    },
    onMore () {
      Toast('更多功能敬请期待')
    }
  }
}
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
}
.logo {
  margin-top: 150px;
}
.menuBox {
  width: 100%;
  height: 200px;
  position: absolute;
  bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu {
  width: 80%;
  height: 150px;
  background-color: #ebebeb;
  border-radius: 10px;
}
.icon {
  width: 32px;
  height: 32px;
}
.btn-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.text-item {
  font-size: 12px;
  color: #000;
}
</style>
