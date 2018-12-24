import request from '@/utils/request'

export function register(data) {
  console.log('12', data)
  return request({
    url: '/user/register',
    method: 'POST',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user/updateUser',
    method: 'POST',
    data
  })
}
