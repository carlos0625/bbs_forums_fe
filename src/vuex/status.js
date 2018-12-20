import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username: '',
      password: '',
      phone: '',
      work: '',
      address: '',
      image: '1.png',
      authority: 'user'
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setUsername (state, username) {
      state.user.username = username
    },
    setPassword (state, password) {
      state.user.password = password
    },
    setPhone (state, phone) {
      state.uset.phone = phone
    },
    setWork (state, work) {
      state.user.work = work
    },
    setAddress (state, address) {
      state.uset.address = address
    },
    setImage (state, image) {
      state.user.image = image
    },
    setAuthority (state, authority) {
      state.user.authority = authority
    }
  }
})
