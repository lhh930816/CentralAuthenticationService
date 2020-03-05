export default {
  state: {
    /**
     * 请求令牌
     */
    token: '',
    id: '',
    name: ''
  },
  namespaced: true,
  actions: {
    /**
     * 设置令牌
     * @param {any} context 
     * @param {string} token 
     */
    setToken(context, token) {
      context.commit('setToken', token);
    },
    /**
     * 设置用户信息
     * @param {any} context 
     * @param {any} user 
     */
    setUser(context, user) {
      context.commit('setUser', user);
    }
  },
  mutations: {
    /**
     * 设置令牌
     * @param {any} state 
     * @param {string} token 
     */
    setToken(state, token) {
      state.token = token;
      sessionStorage.setItem('info', token);
    },
    /**
     * 设置用户信息
     * @param {any} state 
     * @param {any} user 
     */
    setUser(state, user) {
      state.id = user.id;
      state.name = user.name;
    }
  },
  getters: {
    token: state => state.token,
    id: state => state.id,
    name: state => state.name
  }
}
