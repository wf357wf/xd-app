<template>
  <div class="total">
    <van-nav-bar title="调查问卷"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft"/>

    <div class="body">
      <div v-for="activity in activityList" :key="activity.no">
        <div class="activity-list" @click="details(activity.questionNo)">
          <div class="title">{{activity.title}}</div>
          <div class="time">{{activity.time}}</div>
          <img :src="activity.activityimg" class="activityimg">
          <div class="details">
            <div style="color:#363636; font-size:0.5rem;">{{activity.details}}</div>
            <img :src="point" class="point">
          </div>
        </div>
      </div>
      <div style="height:50rem;"></div>
    </div>
  </div>
</template>

<script>
  import { NavBar } from 'vant'

  export default {
    name: 'QuestionList',
    components: {
      [NavBar.name]: NavBar,
    },
    data () {
      return {
        point: 'http://114.115.179.117:8080/psias/images/wechat/point.png',
        disabled: true,
        activityList: [
          {
            title: '2018年度济宁银行客户体验调研',
            time: '2018-10-19 12:00',
            activityimg: 'http://114.115.179.117:8080/psias/images/wechat/survey1.png',
            details: '我们珍视您的声音并将持续改进',
            questionNo: '11111'
          },
          {
            title: '体验有奖！华为电脑、Mata20手机等你！',
            time: '2018-10-19 15:00',
            activityimg: 'http://114.115.179.117:8080/psias/images/wechat/survey2.png',
            details: '华为笔记本电脑、扫地机器人…等你拿！',
            questionNo: '222222'
          },
          {
            title: '服务评价购买财富产品',
            time: '2018-10-19 13:00',
            activityimg: 'http://114.115.179.117:8080/psias/images/wechat/survey3.png',
            details: '填问卷送暖心神秘大礼！',
            questionNo: '333333'
          },
        ]
      }
    },
    methods: {
      onClickLeft () { // 返回上一页
        this.$router.go(-1)
      },
      details (questionNo) {
        this.$router.push({
          name: 'question',
          params: {
            questionNo: questionNo
          }
        })
      }
    }
  }
</script>

<style scoped>
  .total {
    background-color: #f7f7f7;
  }

  .body {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .activity-list {
    width: 22rem;
    border-radius: 1rem;
    background-color: #fff;
    margin-left: .1rem;
    margin-top: .5rem;
    margin-bottom: .5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .title {
    color: #363636;
    font-size: .8rem;
    font-weight: bold;
    margin-left: 1rem;
    margin-top: 1rem;
  }

  .time {
    color: #9C9C9C;
    font-size: .7rem;
    margin-left: 1rem;
    margin-top: 0.5rem;
  }

  .activityimg {
    width: 20rem;
    height: 5rem;
    margin-left: 1rem;;
    margin-top: .5rem;;
  }

  .details {
    width: 20rem;
    margin-left: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  .point {
    width: 1rem;
    height: 1rem;
    vertical-align: middle;
  }
</style>
