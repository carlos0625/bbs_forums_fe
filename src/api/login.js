import request from '@/utils/request'

export  function  login(data) {
  console.log('11',data)
  return request({
    url: '/user/login',
    method: 'POST',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'GET',
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'POST'
  })
}
