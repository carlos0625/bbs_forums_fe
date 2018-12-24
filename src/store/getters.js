const sortByProperty = (arr) => {
  return arr.sort((prev, next) => {
    prev.picked > next.picked
  })
}
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  id: state => state.user.id,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  articles: state => sortByProperty(state.article.articles),
  currentArt: state => state.article.currentArt,
  comments: state => state.article.comments,
  modifyStatus:state=>state.article.modifyStatus
}
export default getters
