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
        <p>历史代发记录</p>
        <van-cell class="dataPicker"
                  title="日期"
                  arrow-direction="down"
                  @click="showPopup"
                  is-link />
        <!-- <van-datetime-picker v-model="currentDate"
                             type="date"
                             :min-date="minDate" /> -->
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
                           type="date"
                           :min-date="minDate" />
    </van-popup>
  </div>
</template>
<script>
import store from '@/store'
import { NavBar, Toast, List, Cell, DatetimePicker, Popup } from 'vant'
export default {
  name: 'about',
  store,
  components: {
    [NavBar.name]: NavBar,
    [List.name]: List,
    [Cell.name]: Cell,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup
  },
  data () {
    return {
      error: false,
      loading: false,
      finished: false,
      show: false,
      list: [],
      end_time: '',
      currentDate_end: '',
      currentDate: new Date(),
      minDate: new Date(),
      calc: '',
      place: "50,000起存",
      predict: '0.00',
      xAxis: ["1个月", "3个月", "6个月", "1年", "09月", "本月"],
      yAxis: [100, 120, 110, 130, 160, 100],
      yAxis2: [80, 100, 85, 80, 85, 120],
      yAxis3: [80, 60, 50, 60, 70, 50]
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
    showPopup () {
      this.show = true;
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          let obj = {}
          obj.date = '2019-12-12'
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
          text: "收益对比图",
          subtext: "收益 (元)",
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
          data: ['本产品', '定期', '同业'],
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
          {            name: "本产品",
            itemStyle: {
              normal: {
                color: "#5E6790",
                lineStyle: {
                  color: "#5E6790"
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
                color: '#363636',
                fontSize: '14',
                fontFamily: 'Helvetica-Bold'
              },
              data: [
                //点的标记的位置
                {
                  coord: ['09月', 160.00],
                  value: '160.00'
                }
              ]
            },
            markLine: {
              //标注线
              lineStyle: { color: '#d8d8d8' },
              symbol: "none", //不要箭头
              label: {
                //不要标注
                show: false
              },
              data: [
                { xAxis: "08月" } //看点的位置停留在哪 该值指向哪
              ]
            }
          },
          {
            name: "同业",
            itemStyle: {
              normal: {
                color: "#FD4367",
                lineStyle: {
                  color: "#FD4367"
                }
              }
            },
            data: this.yAxis2,
            type: "line",
            smooth: true,
            symbolSize: '3',
            symbol: 'none',
            markPoint: {
              symbol: "circle", //点的样式
              symbolSize: 12, //点的大小
              label: {
                //点的标注
                show: false,
                position: ['0', '-200%'], //标注的位置
                formatter: "{c}元", //标注文字（份数到时候单独返回或返回单价计算皆可）
                color: '#363636',
                fontSize: '14',
                fontFamily: 'Helvetica-Bold'
              },
              data: [
                //点的标记的位置
                {
                  coord: ['09月', 85],
                  value: '85.00'
                }
              ]
            },
            markLine: {
              //标注线
              lineStyle: { color: '#d8d8d8' },
              symbol: "none", //不要箭头
              label: {
                //不要标注
                show: false
              },
              data: [
                { xAxis: "09月" } //看点的位置停留在哪 该值指向哪
              ]
            }
          },
          {
            name: "定期",
            itemStyle: {
              normal: {
                color: "#C49756",
                lineStyle: {
                  color: "#C49756"
                }
              }
            },
            data: this.yAxis3,
            type: "line",
            smooth: true,
            symbolSize: '3',
            symbol: 'none',
            markPoint: {
              symbol: "circle", //点的样式
              symbolSize: 12, //点的大小
              label: {
                //点的标注
                show: false,
                position: ['0', '-200%'], //标注的位置
                formatter: "{c}元", //标注文字（份数到时候单独返回或返回单价计算皆可）
                color: '#363636',
                fontSize: '14',
                fontFamily: 'Helvetica-Bold'
              },
              data: [
                //点的标记的位置
                {
                  coord: ['09月', 70],
                  value: '70.00'
                }
              ]
            },
            markLine: {
              //标注线
              lineStyle: { color: '#d8d8d8' },
              symbol: "none", //不要箭头
              label: {
                //不要标注
                show: false
              },
              data: [
                { xAxis: "09月" } //看点的位置停留在哪 该值指向哪
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
.title {
  width: 100%;
  height: 4rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.title p {
  font-size: 14px;
  margin-left: 0.5rem;
}
.dataPicker {
  background-color: #f8f8f8;
  height: 2rem;
  display: flex;
  align-items: center;
}
.list {
  width: 94%;
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
</style>
