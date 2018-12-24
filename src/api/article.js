import request from '@/utils/request'

export  function getArticles() {
  return  request({
    url: '/article/list',
    method: 'get',
  })
}
export function modifyArt(data){
  return request({
    url:'/article/modify',
    method:'post',
    body:data
  })
}

export function getContent(articleId) {
  return request({
    url: '/article/content?articleId=' + articleId,
    method: 'get'
  })
}
