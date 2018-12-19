import Vue from "vue";
import Vuex from "vuex";
import login from "@/vuex-cache/login.js";
import personer from "@/vuex-cache/personer.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login: login,
    personer: personer,
  }
});
