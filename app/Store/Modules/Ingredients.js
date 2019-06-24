const state={
    flour: false,
    gluten: false,
    beans: false,
    tofu: false,
    wheat: false,
    imageRecuperee: false,
    imagePath:''
}

const mutations={
    setFlour(state, payload){
        state.flour = payload
    },
    setGluten(state, payload){
        state.gluten = payload
    },
    setBeans(state, payload){
        state.beans = payload
    },
    setTofu(state, payload){
        state.tofu = payload
    },
    setWheat(state, payload){
        state.wheat = payload
    },
    setImageRecuperee(state, payload){
        state.imageRecuperee=payload
    },
    setImagePath(state,payload){
        state.imagePath=payload
    }
}

const getters={
    flour(state) {
        return state.flour
    },
    gluten(state) {
        return state.gluten
    },
    beans(state) {
        return state.beans
    },
    tofu(state) {
        return state.tofu
    },
    wheat(state) {
        return state.wheat
    },
    imageRecuperee(state){
        return state.imageRecuperee
    },
    imagePath(state){
        return state.imagePath
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