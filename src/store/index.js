import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    predict: null
  },
  getters: {
    DATA: state => {
      return state.data;
    },
    PREDICT: state => {
      return state.predict;
    },
  },
  mutations: {
    SET_DATA: (state, payload) => {
      state.data = payload;
    },
    SET_PREDICT: (state, payload) => {
      state.predict = payload;
    },
  },
  actions: {
    POST: async (context, payload) => {
      context.commit('SET_DATA', []);
      let params = "?name=" + payload.name + "&start=" + payload.start + "&end=" + payload.end;
      axios.get("http://127.0.0.1:5000/test" + params).then((response) => context.commit('SET_DATA', (response.data)));
    },
    PREDICT: async (context, payload) => {
      context.commit('SET_PREDICT', null);
      let params = "?name=" + payload.name + "&start=" + payload.start + "&end=" + payload.end;
      axios.get("http://127.0.0.1:5000/predict" + params).then((response) => {
        console.log(response.data)
        context.commit('SET_PREDICT', (response.data))
      });
    },
  },
  modules: {
  }
})
