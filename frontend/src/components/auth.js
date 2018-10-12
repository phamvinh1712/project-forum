import jQuery from 'jquery';

class auth  {
  static login (username, pass, cb)  {
    if (localStorage.token) {
      if (cb) cb(true)
      return
    }
    this.getToken(username, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
      } else {
        if (cb) cb(false)
      }
    })
  }

  static logout() {
    delete localStorage.token
  }

  static loggedIn() {
    return !!localStorage.token
  }

  static getToken(username, pass, cb) {
    jQuery.ajax({
      type: 'POST',
      url: 'http://localhost:8000/api/rest-auth/login/',
      data: {
        username: username,
        password: pass
      },
      success(res) {
        cb({
          authenticated: true,
          token: res.token
        })
      },

    })
  }
}
export default auth;

