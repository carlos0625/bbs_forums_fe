import { getArticles } from '@/api/article'

const article = {
  state: {
    articles:[1,2],
    newArticle:{},
    modifyArticle:{},
  },
  mutations: {
    SET_ARTICLES:(state,articles)=>{
      state.articles= articles
    },
    MODIFY_ARTICLE:(state,article)=>{
      state.mofifyArticle = article
    },
    NEW_ARTICLE:()=>{
      
    }
  },

  actions: {
    // 获取文章列表
    getArticle({ commit, state }) {
      return new Promise((resolve, reject) => {
        getArticles.then(response => {
          const data = response.data
          if (data.status === 1) {
            commit('SET_ARTICLES', data.data)
          } else {
            reject('getArticle: something wrong')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    modifyArticle({ commit, state }) {
      return new Promise((resolve, reject) => {
        change.then(response => {
          const data = response.data
          if (data.status === 1) {
            commit('SET_ARTICLES', data.data)
          } else {
            reject('getArticle: something wrong')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

  }
}

export default article
