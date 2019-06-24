const state={
    meal: '',
    appetite: '',
    condition: ''
}

const mutations={
    setMeal(state, payload){
        state.meal = payload
    },
    setAppetite(state, payload){
        state.appetite = payload
    },
    setCondition(state, payload){
        state.condition = payload
    }
}

const getters={
    meal(state) {
        return state.meal
    },
    appetite(state) {
        return state.appetite
    },
    condition(state) {
        return state.condition
    }
}

const actions ={

}

// export this module.
export default {
    state,
    mutations,
    actions,
    getters
  }