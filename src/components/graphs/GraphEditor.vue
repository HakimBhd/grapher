<template>
  <b-card color="#eee" class="pa-8">
    <d3-network
      ref="net"
      :net-nodes="data.nodes"
      :net-links="data.edges"
      :options="options"
      @node-click="onNodeClicked"
    />
  </b-card>
</template>

<script>
import D3Network from "vue-d3-network";

export default {
  components: {
    D3Network
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
      canvas: false
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
    onNodeClicked(event, node) {
      console.log(event, node);
    }
  }
};
</script>

<style src="vue-d3-network/dist/vue-d3-network.css"></style>
