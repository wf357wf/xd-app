<template>
  <div class="question">
    <van-nav-bar title="调查问卷"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft" />

    <div class="body">
      <div>
        <div v-for="(question,inx) in questionList"
             :key="inx">
          <div class="questionBox">
            <div class="questionTitle">
              <span style="color:#404040; font-size:0.8rem;">{{question.title}}</span>
            </div>
            <div class="choose">
              <div v-for="(choose,index) in question.chooseList"
                   :key="index">
                <div class="choose-item">
                  <span style="color:#6d6766; font-size:0.8rem;">{{choose.text}}</span>
                  <van-checkbox @click="chooseChange(choose,question.chooseList,question)"
                                v-model="choose.checked"
                                checked-color="#DD4D4F"></van-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <van-button type="primary"
                  size="large"
                  color="#DD4D4F"
                  @click="submitSurvey()">提交问卷</van-button>
    </div>
  </div>
</template>

<script>
import { Button, Icon, NavBar, Toast, Checkbox, CheckboxGroup } from 'vant'
export default {
  name: 'award',
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [NavBar.name]: NavBar,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup
  },
  data () {
    return {
      questionList: [
        {
          title: "Q1、大堂人员能准确的引导本人到相关区域办理业务",
          chooseList: [
            { text: "不赞同", checked: true },
            { text: "赞同", checked: false }
          ]
        },
        {
          title: "Q2、等候期间能清楚了解排队进度",
          chooseList: [
            { text: "满意", checked: true },
            { text: "不满意", checked: false },
            { text: "极度不满意", checked: false }
          ]
        },
        {
          title: "Q3、您在我行办理个人储蓄卡信息变更时，是否在人工柜台办理",
          chooseList: [
            { text: "一般", checked: true },
            { text: "没兴趣", checked: false }
          ]
        },
        {
          title: "Q4、在购买财富产品过程中，是否有客户经理为您提供相关帮助？",
          chooseList: [
            { text: "是", checked: true },
            { text: "否", checked: false }
          ]
        },
      ]

    };
  },
  methods: {
    onClickLeft () { // 返回上一页
      this.$router.go(-1)
    },
    submitSurvey () {

    },
    chooseChange (item, chooseList, question) {
      for (let i = 0; i < chooseList.length; i++) {
        if (chooseList[i].text == item.text) {
          chooseList[i].checked = true
        } else {
          chooseList[i].checked = false
        }
      }
      question.chooseList = chooseList
      let ls = []
      for (let i = 0; i < this.questionList.length; i++) {
        if (this.questionList[i].title == question.title) {
          ls.push(question)
        } else {
          ls.push(this.questionList[i])
        }
      }
      this.questionList = ls
      console.log(this.questionList)
    }
  }
};
</script>

<style scoped>
.question {
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
.questionBox {
  width: 100%;
  background-color: #fff;
  margin-bottom: 0.5rem;
}
.questionTitle {
  width: 95%;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e5e5;
}
.choose {
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 0.1rem;
}
.choose-item {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 0.8rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
