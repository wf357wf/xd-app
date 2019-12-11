import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import List from '../views/List.vue'
import ListAdd from '../views/ListAdd.vue'
import Lucky from '../views/Lucky.vue'
import Award from '../views/Award.vue'
import Question from '../views/Question.vue'
import Test from '../views/Test.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/list',
    name: 'list',
    component: List
  },
  {
    path: '/listadd',
    name: 'listadd',
    component: ListAdd
  },
  {
    path: '/lucky',
    name: 'lucky',
    component: Lucky
  },
  {
    path: '/award',
    name: 'award',
    component: Award
  },
  {
    path: '/question',
    name: 'question',
    component: Question
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  }
]

const router = new VueRouter({
  routes
})

export default router
