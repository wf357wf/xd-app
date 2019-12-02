<template>
  <div id='lucky'>
    <van-nav-bar title='幸运转盘'
                 left-text='返回'
                 left-arrow
                 @click-left='onClickLeft' />
    <lucky-wheel :msg=1></lucky-wheel>
  </div>
</template>

<script>
import { Button, NavBar, Toast, Image } from 'vant'
import LuckyWheel from '@/components/luckywheel'
export default {
  name: 'lucky',
  components: {
    LuckyWheel,
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Image.name]: Image
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
</style>
