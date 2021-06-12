import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function initState() {
  const localGraphs = localStorage.getItem("graphs");
  const graphs = !localGraphs ? [] : JSON.parse(localGraphs);
  return {
    graphs,
    id: null
  };
}

function generateId(array) {
  let id = array.length + 1;
  if (id === 1) return id;

  while (array.indexOf(i => i.id) > -1) {
    id = id + 1;
  }
  return id;
}

function persistData(data) {
  localStorage.setItem("graphs", JSON.stringify(data));
}

function getIndexById(arr, id) {
  return arr.findIndex(i => i.id === Number(id));
}

export default new Vuex.Store({
  state: initState(),
  mutations: {
    SET_ID: (state, payload) => {
      state.id = payload;
    },
    PUSH_GRAPH: (state, payload) => {
      state.graphs.push(payload);
      persistData(state.graphs);
    },
    PULL_GRAPH: (state, index) => {
      state.graphs.splice(index, 1);
      persistData(state.graphs);
    },
    PUSH_NODE: (state, { index, node }) => {
      state.graphs[index].nodes.push(node);
      persistData(state.graphs);
    },
    PULL_NODE: (state, { index, node }) => {
      state.graphs[index].nodes.push(node);
    },
    PUSH_EDGE: (state, { index, edges }) => {
      state.graphs[index].edges.push(...edges);
      persistData(state.graphs);
    },
    DELETE_EDGE: (state, { gIndex, eIndex }) => {
      state.graphs[gIndex].edges.splice(eIndex, 1);
      persistData(state.graphs);
    }
  },
  actions: {
    setCurrentId({ commit }, payload) {
      commit("SET_ID", payload);
    },
    addGraph({ commit, state }, payload) {
      let graph = payload;
      graph.id = generateId(state.graphs);
      graph.nodes = [];
      graph.edges = [];
      graph.created_at = new Date().toLocaleString();
      graph.updated_at = new Date().toLocaleString();

      commit("PUSH_GRAPH", graph);
      window.alert("Graph added succefully");
    },
    getGraph({ state }, id) {
      const graph = state.graphs.find(i => i.id === Number(id));
      return graph;
    },
    deleteGraph({ commit, state }, id) {
      const index = getIndexById(state.graphs, id);
      commit("PULL_GRAPH", index);
    },
    addNode({ commit, state }, { id, data }) {
      const index = getIndexById(state.graphs, id);
      const graph = state.graphs[index]
      const nodeData = {
        node: {
          name: data.name
        },
        index
      };
      nodeData.node.id = generateId(state.graphs[index].nodes);

      graph.updated_at = new Date().toLocaleString();
      commit("PUSH_NODE", nodeData);
      return nodeData.node.id;
    },
    addEdges({ commit, state }, { id, nodeId, data }) {
      const index = getIndexById(state.graphs, id);
      const graph = state.graphs[index]
      if (!data || !data.length) return;
      const edges = data.map(tid => ({
        sid: Number(nodeId),
        tid: Number(tid)
      }));
      const edgesData = {
        edges,
        index
      };

      graph.updated_at = new Date().toLocaleString();
      commit("PUSH_EDGE", edgesData);
    },
    removeEdge({ commit, state }, { id, sid, tid }) {
      const graphIndex = getIndexById(state.graphs, id);
      const graph = state.graphs[graphIndex]
      const edgeIndex = graph.edges.findIndex(
        i => i.sid === sid && i.tid === tid
      );
      const data = {
        gIndex: graphIndex,
        eIndex: edgeIndex
      };

      graph.updated_at = new Date().toLocaleString();
      commit("DELETE_EDGE", data);
    }
  },
  getters: {
    graphs: state => state.graphs,
    id: state => state.id,
    graph: (state, getters) => {
      if (state.id) return state.graphs[getters.index];
      return null;
    },
    index: (state, getters) => {
      if (getters.id) return getIndexById(state.graphs, getters.id);
      return -1;
    }
  }
});
