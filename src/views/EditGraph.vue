<template>
  <b-container v-if="graph" class="my-5">
    <b-card title="Manage graph nodes" :sub-title="graph.name">
      <b-card-text>
        <node-from v-model="node" ref="nodeForm" :nodes="graph.nodes" @save="onAddNode" />
      </b-card-text>
    </b-card>
    <hr class="my-12" />
    <graph-editor :data="graph" />
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
import GraphEditor from "@/components/graphs/GraphEditor";
import NodeFrom from "@/components/forms/NodeFrom";

export default {
  name: "EditGraph",
  components: { GraphEditor, NodeFrom },
  data: () => ({
    graph: null,
    node: {}
  }),
  async mounted() {
    this.getCurrentGraph();
  },
  methods: {
    ...mapActions({
      getGraph: "getGraph",
      deleteGraph: "deleteGraph",
      addNode: "addNode",
      addEdges: "addEdges"
    }),
    async getCurrentGraph() {
      const id = this.$route.params.id;
      this.graph = JSON.parse(JSON.stringify(await this.getGraph(id)));
    },
    async onAddNode() {
      if (!this.$refs.nodeForm.validate()) return;

      const node = {
        id: this.graph.id,
        data: {
          name: this.node.name
        }
      };
      const nodeId = await this.addNode(node);

      const edges = {
        id: this.graph.id,
        data: this.node.edges,
        nodeId
      }
      this.addEdges(edges);

      this.getCurrentGraph();
      this.$refs.nodeForm.reset()
    },
    onDelete() {
      this.deleteGraph(this.graph.id);
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
