export default {
  namespaced: true,
  state: {
    regstryTelephone: '',
    regstryVerificationCode: '',
  },
  mutations: {
    setTelephone(state, originTelephone) {
      state.regstryTelephone = originTelephone
    },
    setVerificationCode(state, originVerificationCode) {
      state.regstryVerificationCode = originVerificationCode
    }
  },

  getters: {
    getOriginBaseTreeData: state => {
      return state.originBaseTreeData;
    }
  }
};
