import { Api } from '@/Api'

class UserSevice {
  async login(user) {
    return await Api.post('/users/login', {
      email: user.email,
      password: user.password
    })
      .then(response => {
        if (response.data) {
          localStorage.setItem('account', response.data)
        }
        return response.data
      })
  }

  async register(user) {
    return await Api.post('/users', user)
      .then(response => {
        if (response.data) {
          localStorage.setItem('account', response.data)
        }
        return response.data
      })
  }

  async update(user) {
    return await Api.patch('/users/' + user._id, user)
      .then(response => {
        if (response.data) {
          localStorage.setItem('account', response.data)
        }
        return response.data
      })
  }

  loggOut() {
    localStorage.removeItem('user')
  }

  getAllUsers() {
    return Api.get('/users')
  }
}

export default new UserSevice()
