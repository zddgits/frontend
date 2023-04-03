import service from '../../../utils/http.js'

export function toLogin(data) {
  return service({
    url: 'http://localhost:88/auth/oauth/token?client_id=LtWebApp&client_secret=LtWebApp&grant_type=password',
    method: 'post',
    params : data
  }) 
}