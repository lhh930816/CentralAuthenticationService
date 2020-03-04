export default {
  state: {
    /**
     * 请求令牌
     */
    token: '',
    name: "李医生"
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
  },
  mutations: {
    /**
     * 设置令牌
     * @param {any} state 
     * @param {string} token 
     */
    setToken(state, token) {
      state.token = token;
      sessionStorage.setItem("info", token);
    }
  },
  getters: {
    token: state => state.token || sessionStorage.getItem("info"),
    name: state => state.name
  }
}
