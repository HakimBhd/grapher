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
import { mapActions, mapGetters } from "vuex";
import GraphEditor from "@/components/graphs/GraphEditor";
import NodeFrom from "@/components/forms/NodeFrom";

export default {
  name: "EditGraph",
  components: { GraphEditor, NodeFrom },
  data: () => ({
    node: {}
  }),
  computed: {
    ...mapGetters({
      graph: 'graph'
    })
  },
  mounted() {
    const id = this.$route.params.id;
    this.setCurrentGraphId(id)
  },
  methods: {
    ...mapActions({
      setCurrentGraphId: "setCurrentId",
      deleteGraph: "deleteGraph",
      addNode: "addNode",
      addEdges: "addEdges"
    }),
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
