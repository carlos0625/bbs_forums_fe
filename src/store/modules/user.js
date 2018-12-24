import {
  login,
  logout,
  getInfo
} from '@/api/login';
import {
  register,
  updateUser
} from '@/api/register'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth';

const user = {
  state: {
    id: 0,
    token: getToken(),
    name: '',
    avatar: '',
    roles: '',
  },

  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
  },

  actions: {
    Login({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        login(data)
          .then(response => {
            console.log('fuck', response);
            let data = response.data.result;
            let token = `Bearer ${data.token}`
            let username = data.username
            let image = data.image
            let role = data.role
            let id = data.id
            setToken(token);
            commit('SET_ID', id)
            commit('SET_TOKEN', token)
            commit('SET_NAME', username)
            commit('SET_AVATAR', image)
            commit('SET_ROLES', role)
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(response => {
            const data = response.data;
            if (data.roles && data.roles.length > 0) {
              commit('SET_ROLES', data.roles);
            } else {
              reject('getInfo: roles must be a non-null array !');
            }
            commit('SET_NAME', data.name);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    updateUser({
      commit,
      state
    },data) {
      return new Promise((resolve, reject) => {
        updateUser(data)
          .then(response => {
            const data = response.data;
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      });
    },

    // 前端登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    },

    // 用户注册
    Register({
      state
    }, data) {
      return new Promise((
        resolve, reject) => {
        register(data)
          .then(response => {
            console.log('register', response)
            // let data2 = respone.data
            resolve(response);
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
};

export default user;
