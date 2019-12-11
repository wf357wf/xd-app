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
          this.number = 0;
        } else {
          this.number += 1;
        }
        this.startMove();
      }, 3000); // 滚动不需要停顿则将2000改成动画持续时间
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
</style>
