export default {
  state: {
    client_id: "client",
    client_secret: "secret",
    response_type: "code",
    grant_type: "password",
    scope: "openid",
  },
  namespaced: true,
  actions: {},
  mutations: {},
  getters: {
    client_id: state => state.client_id,
    client_secret: state => state.client_secret,
    response_type: state => state.response_type,
    grant_type: state => state.grant_type,
    scope: state => state.scope
  }
}
