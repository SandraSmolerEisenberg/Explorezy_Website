
const userAccount = JSON.parse(localStorage.getItem('user'))
const initialState = userAccount
  ? { status: { loggedIn: true }, userAccount }
  : { status: { loggedIn: false }, user: null }

export const user = {
  namespaced: true,
  state: initialState,
  actions: {
  },
  mutations: {
  }
}
