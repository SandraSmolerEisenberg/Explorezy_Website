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

  loggOut() {
    localStorage.removeItem('user')
  }

  getAllUsers() {
    return Api.get('/users')
  }
}

export default new UserSevice()
