export default {
  namespaced: true,
  state: {
    userInfoLogo: ''
  },
  mutations: {
    setUserInfoLogo(state, originUserInfoLogo) {
      state.userInfoLogo = originUserInfoLogo;
    },
  },
  getters: {
    getUserInfoLogo: state => {
      return state.userInfoLogo;
    }
  }
}
