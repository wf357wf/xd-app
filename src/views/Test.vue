<template>
  <div class="about">
    <van-nav-bar title="代发明细"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft" />
    <div class="line"></div>
    <div class="content">
      <div id="myChart"
           :style="{width: '300px', height: '300px'}"></div>
      <div class="title">
        <van-cell style="background:#f7f7f7"
                  title="历史代发记录"
                  @click="showDate"
                  is-link
                  :arrow-direction="arrow" />
        <div class="searchBox"
             v-show="flag">
          <div class="dateBox">
            <van-field class="datePicker"
                       v-model="currentDate_end"
                       @click="showPopup('start')"
                       placeholder="选择开始日期"
                       input-align="center"
                       clickable
                       readonly />
            <div class="line1"></div>
            <van-field class="datePicker"
                       v-model="currentDate_end1"
                       @click="showPopup('end')"
                       placeholder="选择截止日期"
                       input-align="center"
                       readonly
                       clickable />
          </div>
          <van-button type="primary"
                      size="small"
                      color="#c49756"
                      text="查询"
                      class="btn"
                      @click="sure()"></van-button>
        </div>
      </div>
      <van-list class="list"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <div class="listItem"
             v-for="(item,index) in list"
             :key="index">
          <span class="itemTitle">{{item.date}}</span>
          <span class="itemText">{{item.money}}</span>
        </div>
      </van-list>
    </div>
    <van-popup v-model="show"
               class="pop"
               position="bottom">
      <van-datetime-picker v-model="currentDate"
                           type="year-month"
                           :max-date="minDate"
                           @confirm="dateConfirm()"
                           @cancel="dateCancel()" />
    </van-popup>
  </div>
</template>
<script>
import store from '@/store'
import { NavBar, Toast, List, Cell, DatetimePicker, Popup, Field, Button } from 'vant'
export default {
  name: 'about',
  store,
  components: {
    [NavBar.name]: NavBar,
    [List.name]: List,
    [Cell.name]: Cell,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Button.name]: Button
  },
  data () {
    return {
      flag: false,
      arrow: '',
      dateFlag: '',
      loading: false,
      finished: false,
      show: false,
      list: [],
      currentDate_end: '',
      currentDate_end1: '',
      currentDate: new Date(),
      minDate: new Date(),
      calc: '',
      place: "50,000起存",
      predict: '0.00',
      xAxis: ["02", "03", "04", "05", "06", "07"],
      yAxis: [1000, 1200, 1100, 1300, 1600, 1000],
    }
  },
  mounted () {
    this.drawLine();
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
      this.$router.go(-1)
    },
    showDate () {
      this.flag = !this.flag
      if (this.flag) {
        this.arrow = 'down'
      } else {
        this.arrow = ''
      }
    },
    showPopup (m) {
      this.dateFlag = m
      this.show = true
      console.log(this.dateFlag)
    },
    dateConfirm () {
      if (this.dateFlag === 'start') {
        this.currentDate_end = this.timeFormat(this.currentDate)
      }
      if (this.dateFlag === 'end') {
        this.currentDate_end1 = this.timeFormat(this.currentDate)
      }
      this.show = false;
    },
    dateCancel () {
      this.show = false;
    },
    timeFormat (time) { // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      //let day = time.getDate();
      return year + '年' + month + '月'
    },
    sure () {
      console.log('sure')
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          let obj = {}
          obj.date = '2019-12'
          obj.money = this.list.length + 1
          this.list.push(obj);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      var option = {
        title: {
          text: "代发明细走势图",
          subtext: "账单 (元)",
          itemGap: 16,
          textStyle: {
            fontSize: 16,
            color: "#363636",
            fontFamily: "PingFangSC-Semibold"
          },
          subtextStyle: {
            fontSize: 14,
            color: "#363636",
            fontFamily: "PingFangSC-Semibold"
          }
        },
        legend: {
          data: ['收入'],
          align: "right",
          right: 0,
          itemWidth: 18,
          textStyle: {
            fontFamily: "PingFangSC-Regular",
            fontSize: 13,
            color: "#9c9c9c"
          }
        },
        grid: {
          top: 70,
          left: 40,
          right: 4,
          bottom: 50
        },
        xAxis: {
          type: "category",
          data: this.xAxis,
          boundaryGap: false,
          axisLabel: {
            interval: 0,
            rotate: 40,
            color: '#9c9c9c',
            fontSize: '13',
            fontFamily: 'PingFangSC-Regular',
            margin: 18
          },
          axisLine: {
            onZero: false
          },
          splitLine: { show: false }
        },
        yAxis: {
          minInterval: 2,
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: "{value}",
            color: '#9c9c9c',
            fontSize: '13',
            fontFamily: 'PingFangSC-Regular',
            margin: 11
          },
          splitLine: { show: false }
        },
        series: [
          {            name: "收入",
            itemStyle: {
              normal: {
                color: "#c49756",
                lineStyle: {
                  color: "#c49756"
                }
              }
            },
            data: this.yAxis,
            type: "line",
            smooth: true,
            symbolSize: '3',
            symbol: 'none',
            markPoint: {
              symbol: "circle", //点的样式
              symbolSize: 12, //点的大小
              label: {
                //点的标注
                show: true,
                position: ['0', '-200%'], //标注的位置
                formatter: "{c}元", //标注文字（份数到时候单独返回或返回单价计算皆可）
                color: '#c49756',
                fontSize: '14',
                fontFamily: 'Helvetica-Bold'
              }
            },
            markLine: {
              //标注线
              lineStyle: { color: '#c49756' },
              symbol: "none", //不要箭头
              label: {
                //不要标注
                show: false
              },
              data: [
                { xAxis: "08月" } //看点的位置停留在哪 该值指向哪
              ]
            }
          }
        ]
      }
      myChart.setOption(option);
    }
  }
}
</script>
<style scoped>
.about {
  background-color: #fff;
  width: 100%;
}
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.line {
  width: 100%;
  height: 0.5rem;
  background-color: #eee;
}
.line1 {
  width: 10px;
  height: 1px;
  background-color: #c49756;
}
.title {
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.title p {
  font-size: 14px;
  margin-left: 0.5rem;
}
.searchBox {
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
}
.dateBox {
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 0.5rem;
}
.datePicker {
  border: 1px solid #c49756;
  border-radius: 5px;
  width: 40%;
  height: 2rem;
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.list {
  width: 92%;
}
.listItem {
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}
.itemTitle {
  font-size: 14px;
  color: #c49756;
}
.itemText {
  font-size: 14px;
  color: #000;
}
.pop {
  width: 100%;
}
.btn {
  margin-right: 0.5rem;
}
</style>
