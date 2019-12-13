<template>
  <div id='lucky'>
    <van-nav-bar title='幸运转盘'
                 left-text='返回'
                 left-arrow
                 @click-left='onClickLeft' />
    <!-- <lucky-wheel :msg=1></lucky-wheel> -->
    <div class="bg"
         :style="{backgroundImage:'url('+require('../assets/img/bg.png')+')'}">
      <div class="title">
        <p>标题内容***********</p>
      </div>
      <p class="total">商品总价值5000元</p>
      <div class="box"
           :style="{backgroundImage:'url('+require('../assets/img/box.png')+')'}">
        <div>
          <div class="textBox">
            <transition name="slide">
              <p class="text"
                 :key="text.id">{{text.val}}</p>
            </transition>
          </div>
        </div>
      </div>
      <div class="btn"
           @click="plotClick()"></div>
      <div class='tip'
           :style="{backgroundImage:'url('+require('../assets/img/screen.png')+')'}">
        <div class='tip-title'>中奖规则</div>
        <div class='tip-content'>
          1、奖金总额为当期奖金额减去固定奖总额后的90%，以及奖池资金和调节基金转入部分；<br>
          2、奖金总额为当期奖金额减去固定奖总额后的10%；<br>
          3、单注奖金固定为1800元；<br>
          5、单注奖金固定为20元；<br>
          6、单注奖金固定为5元。<br>
          7、单注彩票中奖奖金最高限额500万元。<br>
        </div>
      </div>
      <div class="nameList"
           :style="{backgroundImage:'url('+require('../assets/img/screen2.png')+')'}">
        <div class='prize-title'>上期中奖名单</div>
        <div class='prize-item'
             v-for='(item,index) in prize_list'
             :style="{backgroundColor: index%2 == 1 ? '#fe852d' : '#ef6301'}"
             :key='index'>
          <div class='prize-phone'>{{item.num}}</div>
          <div class='prize-name'>中了{{item.name}}</div>
          <div class='prize-data'>{{item.data}}</div>
        </div>
      </div>
    </div>
    <div class='toast'
         v-show='toast_control'>
      <div class='toast-container'>
        <img :src='toast_pictrue'
             class='toast-picture' />
        <div class='close'
             @click='close_toast()'></div>
        <div class='toast-title'>{{toast_title}}</div>
        <div class='toast-btn'>
          <div class='toast-cancel'
               @click='close_toast'>关闭</div>
        </div>
      </div>
    </div>
    <div class='toast-mask'
         v-show='toast_control'></div>
    <div class="loading"
         v-show='loading_control'>
      <img src="../assets/img/11111.gif"
           class="loadingImg">
    </div>
    <div class='toast-mask'
         v-show='loading_control'></div>
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
  data () {
    return {
      pageLists: [],
      pageFlag: true,
      custNo: 815100129661289,
      refObj: null,
      toast_control: false, // 抽奖结果弹出框控制器
      hasPrize: false, // 是否中奖
      clickFlag: true, // 是否可以旋转抽奖
      loading_control: false, // 抽奖过程弹出框控制器
      textArr: [
        '一等奖 200元超市代金券',
        '二等奖 100元超市代金券',
        '三等奖 50元超市代金券'
      ],
      number: 0,
      prize_list: [
        {
          num: '1234567890123',
          name: '200代金券',
          data: '2019-12-10'
        },
        {
          num: '1234567890123',
          name: '200代金券',
          data: '2019-12-10'
        },
        {
          num: '1234567890123',
          name: '200代金券',
          data: '2019-12-10'
        },
        {
          num: '1234567890123',
          name: '200代金券',
          data: '2019-12-10'
        },
        {
          num: '1234567890123',
          name: '200代金券',
          data: '2019-12-10'
        },
      ]
    }
  },
  computed: {
    text () {
      return {
        id: this.number,
        val: this.textArr[this.number]
      }
    },
    toast_title () {
      return this.hasPrize
        ? '恭喜您，获得' +
        this.prize_list[this.index].count +
        ' ' +
        this.prize_list[this.index].name
        : '未中奖'
    },
    toast_pictrue () {
      return this.hasPrize
        ? require('../assets/img/congratulation.png')
        : require('../assets/img/sorry.png')
    }
  },
  mounted () {
    this.startMove()
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    startMove () {
      // eslint-disable-next-line
      let timer = setTimeout(() => {
        if (this.number === 2) {
          this.number = 0
        } else {
          this.number += 1
        }
        this.startMove()
      }, 3000) // 滚动不需要停顿则将2000改成动画持续时间
    },
    plotClick () {
      this.loading_control = true
      if (!this.clickFlag) return
      var that = this
      var duringTime = 1 // 默认为1s
      this.clickFlag = false // 旋转结束前，不允许再次触发
      setTimeout(function () {
        that.clickFlag = true
        that.game_over()
      }, duringTime * 1000 + 1500) // 延时，保证转盘转完
    },
    game_over () {
      this.loading_control = false
      this.toast_control = true
    },
    // 关闭弹窗
    close_toast () {
      this.toast_control = false
    }
  }
}
</script>
<style scoped>
.bg {
  width: 100%;
  position: absolute;
  z-index: -10;
  background-repeat: no-repeat;
  background-position: 0px 0px;
  background-size: 100% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.a1 {
  width: 100px;
  height: 100px;
  margin-top: 100px;
  background-color: aqua;
}
.title {
  width: 50%;
  height: 2rem;
  background-color: #eb0212;
  color: #fbebeb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 13rem;
  font-size: 1rem;
}
.total {
  color: #ffe839;
  font-size: 0.8rem;
  margin-top: 1rem;
}
.box {
  width: 22rem;
  height: 16rem;
  background-repeat: no-repeat;
  background-position: 0px 0px;
  background-size: 100% auto;
  margin-top: 0.6rem;
}
.tip {
  width: 22rem;
  height: 17.5rem;
  background-repeat: no-repeat;
  background-position: 0px 0px;
  background-size: 100% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.tip-title {
  color: #ffe43d;
  font-size: 1rem;
  margin-top: 1.2rem;
}
.tip-content {
  width: 18rem;
  color: #ffe43d;
  font-size: 0.8rem;
  margin-top: 0.6rem;
  line-height: 1.4rem;
}
.nameList {
  width: 22rem;
  height: 15rem;
  background-repeat: no-repeat;
  background-position: 0px 0px;
  background-size: 100% auto;
  margin-top: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.prize-title {
  color: #ffe43d;
  font-size: 1rem;
  margin-top: 1.2rem;
  margin-bottom: 1rem;
}
.prize-item {
  width: 90%;
  height: 1.8rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 0.8rem;
}
.textBox {
  width: 100%;
  height: 5.6rem;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  text-align: center;
}
.text {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s linear;
}
.slide-enter {
  transform: translateY(40px) scale(1);
  opacity: 1;
}
.slide-leave-to {
  transform: translateY(-40px) scale(0.8);
  opacity: 0;
}
.btn {
  width: 70%;
  height: 3rem;
  top: 27.8rem;
  position: absolute;
  z-index: 9999;
}
.toast-mask {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  width: 100%;
  height: 100%;
}
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 20000;
  transform: translate(-50%, -50%);
  width: 15.4375rem;
  background: #fff;
  border-radius: 0.3125rem;
  padding: 0.3125rem;
  background-color: rgb(252, 244, 224);
}
.toast-container {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px dotted #fccc6e;
}
.toast-picture {
  position: absolute;
  top: -6.5rem;
  left: -1.5rem;
  width: 18.75rem;
  height: 8.5625rem;
}
.toast-pictrue-change {
  position: absolute;
  top: -1.5rem;
  left: -1.375rem;
  width: 17.5rem;
  height: 3.125rem;
}
.toast-title {
  padding: 2.8125rem 0;
  font-size: 18px;
  color: #fc7939;
  text-align: center;
}
.toast-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.9375rem;
}
.toast-btn div {
  background-image: -moz-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );

  background-image: -ms-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  background-image: -webkit-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
  width: 4.6875rem;
  height: 1.875rem;
  border-radius: 1.875rem;
  text-align: center;
  line-height: 1.875rem;
  color: #fff;
}
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 20000;
  width: 16rem;
  height: 10rem;
  transform: translate(-50%, -50%);
  background: #ea3344;
  border-radius: 0.3125rem;
  padding: 0.3125rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loadingImg {
  width: 100%;
}
</style>
