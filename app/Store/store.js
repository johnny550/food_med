import Vue from 'nativescript-vue'
import Vuex from 'vuex'

//modules
import answers from './Modules/Answers'
import nextAnswers from './Modules/Meal_Answers'
import ingredients from './Modules/Ingredients'

Vue.use(Vuex)

let debug = process.env.NODE_ENV !== 'production'

let store = new Vuex.Store({
  modules: {
    answers,
    nextAnswers,
    ingredients
  },
  strict: debug
})

Vue.prototype.$store = store

export default store