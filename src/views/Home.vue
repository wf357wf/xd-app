<template>
  <div class="home">
    <van-nav-bar title="薪动平台"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft" />
    <van-cell-group style="margin-top:10px">
      <van-cell is-link
                @click="onList()">
        <template slot="title">
          <div class="item">
            <img src="../assets/img/icon-2.png"
                 class="icon">
            <span class="custom-title">代理分销</span>
          </div>
        </template>
      </van-cell>
      <van-cell is-link
                @click="onLucky()">
        <template slot="title">
          <div class="item">
            <img src="../assets/img/icon-3.png"
                 class="icon">
            <span class="custom-title">幸运转盘</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { NavBar, Cell, CellGroup } from 'vant'
import System from '../service/system'
export default {
  name: 'home',
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data () {
    return {
      Filter: {}
    }
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#f7f7f7')
  },
  created () {
    this.init()
  },
  methods: {
    onList () {
      this.$router.push('/List')
    },
    onLucky () {
      this.$router.push('/Lucky')
    },
    onClickLeft () {
      Toast('返回')
      this.$router.go(-1)
    },
    init () {
      System.getInterfaceList({ Filter: this.Filter }).then(res => {
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
.home {
  background-color: #f7f7f7;
}
.icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
.item {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
