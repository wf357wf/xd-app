<template>
  <div class="list">
    <van-nav-bar title="我的奖品"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft" />
    <van-notice-bar left-icon="info-o">
      奖品，兑换券使用说明
    </van-notice-bar>
    <div class="coupon-item"
         v-for="(item, index) in lists"
         :key="index">
      <div class="style-box">
        <div class="info-box">
          <p class="title">{{item.awardName}}</p>
          <div class="coupon-money">
            <p class="data">抽奖时间 {{item.gainDate}} {{item.gainTime}}</p>
          </div>
        </div>
        <div class="get-btn">
          <span>未兑换</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon, NavBar, Toast, NoticeBar } from 'vant'
import System from '../service/system'
import checkBank from '../utils/checkBank'
import checkChineseName from '../utils/checkChineseName'
export default {
  name: 'award',
  components: {
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [NoticeBar.name]: NoticeBar
  },
  data () {
    return {
      lists: [],
      custNo: '815100129661289',
      custName: '任敏碧',
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    onClickLeft () { // 返回上一页
      this.$router.go(-1)
    },
    init () {
      System.getAwardGainRecordList({ custNo: this.custNo }).then(res => {
        console.log('666', res)
        if (res.data.code === 0) {
          this.lists = res.data.data
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
em {
  font-style: normal;
}
.coupon-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.coupon-item .nick {
  padding: 0.66% 0;
  color: #fff;
}
.coupon-item .coupon-money {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  margin-top: 0.2rem;
}
.coupon-item .coupon-money em {
  font-size: 3.8rem;
}
.coupon-item .coupon-money .lay:last-child {
  flex: 1;
  padding: 0 3%;
}
.style-box {
  width: 95%;
  position: relative;
  margin-top: 1rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #e5004f;
}
.info-box {
  -webkit-box: 1;
  -webkit-flex: 1;
  flex: 1;
  padding: 0 3% 0 10%;
  position: relative;
}
.get-btn {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24%;
  height: 4rem;
  text-align: center;
  color: #fff;
  font-size: 0.5rem;
  background-color: #e5004f;
  position: relative;
}
.title {
  font-size: 1rem;
  margin-left: 10px;
  color: #e5004f;
}
.data {
  font-size: 0.6rem;
  margin-left: 10px;
  color: #e5004f;
}
.get-btn span {
  width: 4rem;
  font-size: 0.7rem;
  word-break: break-all;
}
.style-box {
  background-color: #f7dbcd;
  color: #e5004f;
  border: none;
}
.style-box:after,
.style-box:before {
  content: "";
  height: 0.3rem;
  position: absolute;
  left: 0;
  right: 0;
  display: block;
  z-index: 9;
  background-image: linear-gradient(
      -45deg,
      #f5f5f5 25%,
      transparent 25%,
      transparent
    ),
    linear-gradient(-135deg, #f5f5f5 25%, transparent 25%, transparent),
    linear-gradient(-45deg, transparent 75%, #f5f5f5 75%),
    linear-gradient(-135deg, transparent 75%, #f5f5f5 75%);
  background-size: 0.8rem 0.8rem;
  background-repeat: repeat-x, repeat-x;
}
.style-box:after {
  top: -0.12rem;
}
.style-box:before {
  bottom: -0.12rem;
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
}
.style-box .get-btn span {
  color: #fff;
}
</style>
