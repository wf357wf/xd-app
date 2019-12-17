<template>
  <div class="question">
    <van-nav-bar title="调查问卷"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft"/>

    <div class="body">
      <div>
        <div v-for="(question,inx) in questionList"
             :key="inx">
          <div class="questionBox" v-if="question.type==='01'">
            <div class="questionTitle">
              <span style="color:#404040; font-size:0.8rem;" v-if="question.mustQuestion==='1'">{{inx+1}}、{{question.title}}(必选项)</span>
              <span style="color:#404040; font-size:0.8rem;" v-if="question.mustQuestion!=='1'">{{inx+1}}、{{question.title}}</span>
            </div>
            <div class="choose">
              <div v-for="(choose,index) in question.chooseList"
                   :key="index">
                <div class="choose-item" @click="chooseChange(choose,question.chooseList,question)">
                  <span style="color:#6d6766; font-size:0.8rem;">{{choose.text}}</span>
                  <van-checkbox
                    v-model="choose.checked"
                    checked-color="#DD4D4F"></van-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-for="(question,inx) in questionList"
             :key="'info-'+inx">
          <div class="questionBox" v-if="question.type==='02'">
            <div class="questionTitle">
              <span style="color:#404040; font-size:0.8rem;" v-if="question.mustQuestion==='1'">{{inx+1}}、{{question.title}}(必选项)</span>
              <span style="color:#404040; font-size:0.8rem;" v-if="question.mustQuestion!=='1'">{{inx+1}}、{{question.title}}</span>
            </div>
            <div class="choose">
              <div v-for="(choose,index) in question.chooseList"
                   :key="'info2-'+index">
                <div class="choose-item" @click="chooseChangeMulti(choose,question.chooseList,question)">
                  <span style="color:#6d6766; font-size:0.8rem;">{{choose.text}}</span>
                  <van-checkbox shape="square"
                                v-model="choose.checked"
                                checked-color="#DD4D4F"></van-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-for="(question,inx) in questionList"
             :key="'info3-'+inx">
          <div class="questionBox" v-if="question.type==='04'">
            <div class="questionTitle">
              <span style="color:#404040; font-size:0.8rem;" v-if="question.mustQuestion==='1'">{{inx+1}}、{{question.title}}(必选项)</span>
              <span style="color:#404040; font-size:0.8rem;" v-if="question.mustQuestion!=='1'">{{inx+1}}、{{question.title}}</span>
            </div>
            <div class="choose">
              <div class="textarea-context">
                <van-field
                  v-model="message"
                  clearable
                  rows="2"
                  autosize
                  type="textarea"
                  placeholder=""
                  maxlength="50"
                  show-word-limit
                  @blur="changeText(question)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <van-button type="primary"
                  size="large"
                  color="#DD4D4F"
                  @click="submitSurvey()">提交问卷
      </van-button>
    </div>
  </div>
</template>

<script>
  import { Button, Icon, NavBar, Toast, Checkbox, CheckboxGroup, Field, CellGroup, Cell } from 'vant'
  import System from '../service/system'

  export default {
    name: 'award',
    components: {
      [Button.name]: Button,
      [Icon.name]: Icon,
      [NavBar.name]: NavBar,
      [Checkbox.name]: Checkbox,
      [CheckboxGroup.name]: CheckboxGroup,
      [Field.name]: Field,
      [CellGroup.name]: CellGroup
    },
    mounted () {
      this.init()
    },
    data () {
      return {
        questionList: [],
        message: '',
        questionNo: this.$route.params.questionNo
      }
    },
    methods: {
      onClickLeft () { // 返回上一页
        this.$router.go(-1)
      },
      submitSurvey () {
        let Filter = {}
        Filter.questionList = this.questionList;
        let jsonStr = JSON.stringify(Filter);
        System.addQuestion({ Filter: jsonStr }).then(res => {
          if (res.code === 0) {
            Toast('提交成功')
            this.$router.go(-1)
          } else {
            Toast(res.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      },
      changeText (question) {
        question.option = this.message
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
      },
      chooseChange (item, chooseList, question) {
        var flag = true
        for (let i = 0; i < chooseList.length; i++) {
          if (chooseList[i].text == item.text) {
            chooseList[i].checked = !chooseList[i].checked
          } else {
            chooseList[i].checked = false
          }
        }
        if (question.mustQuestion === '1') {
          for (let i = 0; i < chooseList.length; i++) {
            if (chooseList[i].checked) {
              flag = false
              break
            } else {
              flag = true
            }
          }
          if (flag) {
            Toast('必选项不能为空！')
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
      },
      chooseChangeMulti (item, chooseList, question) {
        for (let i = 0; i < chooseList.length; i++) {
          if (chooseList[i].text == item.text) {
            chooseList[i].checked = !chooseList[i].checked
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
      },
      init () {
        System.getQuestionList().then(res => {
          if (res.data.code === 0) {
            this.questionList = res.data.data
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
  .question {
    background-color: #f7f7f7;
  }

  .body {
    width: 100%;
    /*height: 100vh;*/
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

  .textarea-context {

    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 0.8rem;
    width: 95%;
    height: 5rem;
    border: 1px solid #e5e5e5;
  }

</style>
