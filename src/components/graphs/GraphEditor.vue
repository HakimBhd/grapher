<template>
  <b-card class="pa-8 bg-light">
    <b-alert show dismissible variant="primary" class="d-flex">
      <div>
        <b-icon
          class="mr-3 h3"
          icon="exclamation-circle-fill"
          variant="primary"
        ></b-icon>
      </div>
      <div>
        <span>Click any edge (relation) to remove it.</span> <br />
        <span>Click any node to like it to other node.</span>
      </div>
    </b-alert>

    <b-card v-if="edge.sid" title="Link nodes">
      <node-linker v-model="edge" ref="nodeLinker" @submit="onSubmit" />
    </b-card>

    <div class="d-flex">
      <d3-network
        ref="net"
        class="mx-auto"
        :net-nodes="data.nodes"
        :net-links="data.edges"
        :options="options"
        @node-click="onNodeClicked"
        @link-click="onEdgeClicked"
      />
    </div>
  </b-card>
</template>

<script>
import { mapActions } from "vuex";
import D3Network from "vue-d3-network";
import NodeLinker from "@/components/graphs/NodeLinker";

export default {
  components: {
    D3Network,
    NodeLinker
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      nodeSize: 40,
      canvas: false,
      edge: {
        sid: null,
        tid: []
      }
    };
  },
  computed: {
    options() {
      return {
        force: 3000,
        size: { w: 600, h: 600 },
        nodeSize: this.nodeSize,
        nodeLabels: true,
        linkLabels: true,
        canvas: this.canvas
      };
    }
  },
  methods: {
    ...mapActions({
      removeEdge: "removeEdge",
      addEdges: "addEdges"
    }),
    onSubmit() {
      const nodeId = this.edge.sid.id;
      const tids = this.edge.tid.map(i => i.id);

      const edges = {
        id: this.data.id,
        data: tids,
        nodeId
      };
      this.addEdges(edges);
      this.$refs.nodeLinker.reset();
    },
    onNodeClicked(event, node) {
      if (this.edge.sid === null) this.edge.sid = node;
      else this.edge.tid.push(node);
    },
    onEdgeClicked(e, edge) {
      const data = {
        id: this.data.id,
        sid: edge.sid,
        tid: edge.tid
      };
      this.removeEdge(data);
    }
  }
};
</script>

<style src="vue-d3-network/dist/vue-d3-network.css"></style>
