<template>
  <div class="list">
    <van-nav-bar title="代理分销"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft" />
    <div v-if="pageLists.length > 0">
      <!-- <van-swipe-cell class="swipe"
                      v-for="(item, index) in pageLists"
                      :key="index">
        <van-cell>
          <div class="content">
            <div>
              <span>户名 ：</span>
              <span>{{item.userName}}</span>
            </div>
            <div style="margin-left:10px">
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
      </van-swipe-cell> -->
      <van-cell-group>
        <van-cell v-for="(item, index) in pageLists"
                  :key="index">
          <div class="flex-content">
            <div class="flex-content">
              <div style="width:6rem">
                <span>户名 ：</span>
                <span>{{item.releAgName}}</span>
              </div>
              <div style="margin-left:10px">
                <span>卡号 ：</span>
                <span>{{item.releAgNo}}</span>
              </div>
            </div>
            <div>
              <van-icon name="delete"
                        color="red"
                        @click="plotClick(item,index)" />
            </div>
          </div>
        </van-cell>
      </van-cell-group>
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
                  color="#DD4D4F"
                  @click="add()">关联新账户</van-button>
    </div>
  </div>
</template>
<script>
import store from '@/store'
import { Button, Cell, CellGroup, Icon, Dialog, NavBar, Toast, Image } from 'vant'
import System from '../service/system'
export default {
  name: 'list',
  store,
  components: {
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Dialog.name]: Dialog,
    [NavBar.name]: NavBar,
    [Image.name]: Image
  },
  mounted () {
    this.init()
  },
  data () {
    return {
      pageLists: [],
      pageFlag: true,
      custNo: 815100129661289,
      refObj: null
    }
  },
  methods: {
    add () {
      this.$router.push({
        name: 'listadd',
        params: {
          refObj: this.refObj
        }
      })
      store.commit('increase')
    },
    onClickLeft () {
      this.$router.go(-1)
    },
    plotClick (item, index) {
      Dialog.confirm({
        message: '确定删除吗？'
      }).then(() => {
        this.del(item)
      }).catch(() => {
        console.log('2222', index)
      })
    },
    del (item) {
      // store.commit('delItem', index)
      let Filter = {}
      Filter.custNo = item.custNo
      Filter.cardNum = item.releAgNo
      System.delInterfaceList({ Filter }).then(res => {
        if (res.data.code === 0) {
          Toast('删除成功！')
          this.init()
        } else {
          Toast(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    init () {
      System.getInterfaceList({ custNo: this.custNo }).then(res => {
        if (res.data.code === 0) {
          this.pageLists = res.data.data
          this.refObj = res.data.refObj
        } else {
          Toast(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
.list {
  width: 100%;
  height: 100%;
}
.swipe {
  height: 100%;
}
.flex-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.btn-bottom {
  width: 100%;
  position: absolute;
  bottom: 10px;
}
.bg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 100%;
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
