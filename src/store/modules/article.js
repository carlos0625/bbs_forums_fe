import {
  getArticles,
  addArt,
  setPickStatus,
  getDetail,
  getComments,
  addComment,modifyArt,
  setTop,
  addReversion,
  getRWUs
} from '@/api/article'
import { getRWU } from '../../api/article';

const article = {
  state: {
    articles: [],
    newArticle: {},
    modifyArticle: {},
    modifyStatus:{
      ismodify:false,
    },
    currentArt: {
      content:"hello"
    },
    comments: []
  },
  mutations: {
    SET_ARTICLES: (state, articles) => {
      state.articles = articles
    },
    MODIFY_ARTICLE: (state, article) => {
      state.mofifyArticle = article
    },
    MODIFY_STATUS:(state,data)=>{
      state.modifyStatus = data
    },
    SET_CURRENT_ARTICLE: (state, article) => {
      state.currentArt = article
    },
    SET_COMMENTS: (state, comments) => {
      state.comments = comments
    }
  },
  actions: {
    setModifyed({commit,dispath},data){
      commit('MODIFY_STATUS',data)
    },
    // 获取文章列表
    getArticle({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getArticles().then(response => {
          const data = response.data
          if (data.status === 1) {
            commit('SET_ARTICLES', data.result)
          } else {
            reject('getArticle: something wrong')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getDetail({
      commit
    }, articleId) {
      return new Promise((resolve, reject) => {
        getDetail(articleId).then(response => {
          const data = response.data
          if (data.status === 1) {
            console.log('res', data.result)
            commit('SET_CURRENT_ARTICLE', data.result)
          } else {
            reject('getContent: something wrong')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    modifyArticle({
      commit,
      state
    },data) {
      return new Promise((resolve, reject) => {
        modifyArt(data).then(response => {
          const data = response.data
          if (data.status === 1) {
            // commit('SET_ARTICLES', data.data)
          } else {
            reject('getArticle: something wrong')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    //发表文章
    addArticle({
      state
    }, data) {
      return new Promise((resolve, reject) => {
        addArt(data).then(response => {
          const data2 = response.data
          console.log('fff', data2)
          if (data2.status === 1) {
            resolve(data2.result)
          } else {
            reject('addArticle error')
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    setPickStatus({
      state
    }, {
      articleId,
      picked
    }) {
      return new Promise((resolve, reject) => {
        setPickStatus({
          articleId,
          picked
        }).then(response => {
          const data = response.data
          if (data.status === 1) {
            resolve(data.result)
          } else {
            reject('addArticle error')
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    getComments({
      commit,
    },id) {
      return new Promise((resolve, reject) => {
        getComments(id).then(response => {
          const data = response.data
          if (data.status === 1) {
            commit('SET_COMMENTS', data.result)
          } else {
            reject('getArticle: something wrong')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    addComment({
      commit,
    }, data) {
      return new Promise((resolve, reject) => {
        addComment(data).then(response => {
          const data = response.data
          if (data.status === 1) {
            // commit('SET_ARTICLES', data.result)
          } else {
            reject('add comment failed')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    updateTopState({commit}, data) {
      return new Promise((resolve, reject) => {
        setTop(data).then(response => {
          const data = response.data
          console.log('fuck', data)
          if(data.status === 1) {
            resolve(data)
          } else {
            reject('set top fail')
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    //添加评论回复
    addRev({commit}, data) {
      return new Promise((resole, reject) => {
        addReversion(data).then(response => {
          const data = response.data
          if(data.status === 1) {
            resole(data)
          } else {
            reject('fail to add reversion')
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    //根据评论的id查询评论回复
    getReversions({commit}, id) {
      return new Promise((resolve, reject) => {
        getRWUs(id).then(response => {
          const data = response.data
          if(data.status === 1) {
            resolve(data)
          } else {
            reject('fail to query reversions')
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    getReversion({commit}, id) {
      return new Promise((resolve, reject) => {
        getRWU(id).then(response => {
          const data = response.data
          if(data.status === 1) {
            resolve(data)
          } else {
            reject('fail to query reversion')
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default article
