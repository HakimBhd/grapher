import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function initState () {
  const graphs = !localStorage.graphs ? [] : JSON.parse(localStorage.graphs);
  const nodes = !localStorage.nodes ? [] : JSON.parse(localStorage.nodes);
  return {
    graphs,
    nodes
  };
}

function generateGraphId (graphs) {
  let id = graphs.length + 1
  if (id === 1) return id

  while (graphs.indexOf(i => i.id) > -1) {
    id = id + 1;
  }
  return id
}

export default new Vuex.Store({
  state: initState(),
  mutations: {
    PUSH_GRAPH: (state, payload) => {
      state.graphs.push(payload);
      localStorage.graphs = JSON.stringify(state.graphs);
    },
    PULL_GRAPH: (state, index) => {
      state.graphs.splice(index, 1)
      localStorage.graphs = JSON.stringify(state.graphs);
    }
  },
  actions: {
    addGraph({ commit, state }, payload) {
      let graph = payload
      graph.id = generateGraphId(state.graphs)
      graph.created_at = new Date().toLocaleString()
      graph.updated_at = new Date().toLocaleString()

      commit("PUSH_GRAPH", graph);
      window.alert('Graph added succefully')
    },
    getGraph({ state }, id) {
      const graph = state.graphs.find(i => i.id === Number(id))
      return graph
    },
    deleteGraph({ commit, state }, id) {
      const index = state.graphs.findIndex(i => i.id === Number(id))
      commit('PULL_GRAPH', index)
    }
  },
  getters: {
    graphs: state => state.graphs
  }
});
