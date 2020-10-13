import UserService from '../services/UserService.js'
const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { currentUser: true }, user }
  : { status: { currentUser: false }, user: null }

export const account = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return UserService.login(user).then(
        user => {
          commit('loggedIn', user)
          return Promise.resolve(user)
        },
        error => {
          commit('loggInFail')
          return Promise.reject(error)
        }
      )
    },
    addTrip({ commit }, payload) {
      return UserService.addTrip(payload).then(
        user => {
          commit('added', user)
          return Promise.resolve(user)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    deleteOneTrip({ commit }, payload) {
      return UserService.deleteUserOneTrip(payload).then(
        user => {
          commit('deleted', user)
          return Promise.resolve(user)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    deleteTrips({ commit }, id) {
      return UserService.deleteUserTrips(id).then(
        user => {
          commit('deleted', user)
          return Promise.resolve(user)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    register({ commit }, user) {
      return UserService.register(user).then(
        user => {
          commit('registered', user)
          return Promise.resolve(user)
        },
        error => {
          commit('registrationFail')
          return Promise.reject(error)
        }
      )
    },
    update({ commit }, user) {
      return UserService.update(user).then(
        user => {
          commit('updated', user)
          return Promise.resolve(user)
        },
        error => {
          return Promise.reject(error)
        }
      )
    },
    loggOut({ commit }) {
      UserService.loggOut()
      commit('loggOut')
    }
  },
  mutations: {

    added(state, user) {
      state.status.currentUser = true
      state.user = user
    },
    deleted(state, user) {
      state.status.currentUser = true
      state.user = user
    },
    loggedIn(state, user) {
      state.status.currentUser = true
      state.user = user
    },
    registered(state, user) {
      state.status.currentUser = true
      state.user = user
    },
    updated(state, user) {
      state.status.currentUser = true
      state.user = user
    },
    loggInFail(state) {
      state.status.currentUser = false
      state.user = {}
      localStorage.clear()
    },
    registrationFail(state) {
      state.status.currentUser = false
      state.user = {}
      localStorage.clear()
    },
    loggOut(state) {
      state.status.currentUser = false
      state.user = {}
      localStorage.clear()
    }

  }
}
