const state ={
    swallowingDifficulties: false,
    stuckFood: false,
    looseStools: false,
    suddenBowelMvt: false,
    stomachHeaviness: false,
    abdomenBloating: false,
    fatigue: false,
    weakness: false
}

const mutations ={
    setSwallowingDifficulties(state, payload){
        state.swallowingDifficulties = payload
    },
    setStuckFood(state, payload){
        state.stuckFood = payload
    },
    setLooseStools(state, payload){
        state.looseStools = payload
    },
    setSuddenBowelMvt(state, payload){
        state.suddenBowelMvt = payload
    },
    setStomachHeaviness(state, payload){
        state.stomachHeaviness = payload
    },
    setAbdomenBloating(state, payload){
        state.abdomenBloating = payload
    },
    setFatigue(state, payload){
        state.fatigue = payload
    },
    setWeakness(state, payload){
        state.weakness = payload
    }
}

const getters ={
    swallowingDifficulties(state) {
        return state.swallowingDifficulties
    },
    stuckFood(state) {
        return state.stuckFood
    },
    looseStools(state) {
        return state.looseStools
    },
    suddenBowelMvt(state) {
        return state.suddenBowelMvt
    },
    stomachHeaviness(state) {
        return state.stomachHeaviness
    },
    abdomenBloating(state) {
        return state.abdomenBloating
    },
    fatigue(state) {
        return state.fatigue
    },
    weakness(state) {
        return state.weakness
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