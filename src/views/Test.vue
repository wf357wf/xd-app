<template>
  <div class="question">
    <van-nav-bar title="1111111"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft" />

    <div class="body">
      <div class="box"></div>
    </div>
  </div>
</template>

<script>
import { NavBar } from 'vant'
export default {
  name: 'award',
  components: {
    [NavBar.name]: NavBar
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
@keyframes wobble {
  from {
    transform: translate3d(0, 0, 0);
  }

  15% {
    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);
  }

  30% {
    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);
  }

  45% {
    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);
  }

  60% {
    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);
  }

  75% {
    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}
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
.box {
  width: 100px;
  height: 100px;
  background-color: blue;
  animation: wobble 5s infinite;
}
</style>
