import request from '@/utils/request'

export  function getArticles() {
  return  request({
    url: '/article/list',
    method: 'get',
  })
}
export function modifyArt(data){
  return request({
    url:'/article/updateContent',
    method:'post',
    data
  })
}

export function getDetail(articleId) {
  return request({
    url: `/article/findById?articleId=${articleId}`,
    method: 'get'
  })
}

export function addArt(data) {
  return request({
    url: '/article/addArticle',
    method: 'POST',
    data
  })
}

export function setPickStatus({articleId,picked}){
  return request({
    url:`/article/setPicked?id=${articleId}&picked=${picked}`,
    method:'GET'
  })
}

export function getComments(id){
  return request({
    url:`/comment/getAll?articleId=${id}`,
    method:'GET'
  })
}
export function addComment(data){
  return request({
    url:`/comment/addComment`,
    method:'POST',
    data
  })
}