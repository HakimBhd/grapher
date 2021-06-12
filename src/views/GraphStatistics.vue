<template>
  <b-container v-if="graph" class="my-5">
    <div class="display-4">{{ graph.name }} graph statistics</div>

    <b-row>
      <b-col class="my-1" cols="12" sm="6" md="3">
        <statistic-card title="Nodes" :value="nodesNumber" />
      </b-col>
      <b-col class="my-1" cols="12" sm="6" md="3">
        <statistic-card title="Relations" :value="edgesNumber" />
      </b-col>
      <b-col class="my-1" cols="12" sm="6" md="3">
        <statistic-card title="Created at" :value="graph.created_at" />
      </b-col>
      <b-col class="my-1" cols="12" sm="6" md="3">
        <statistic-card title="Updated at" :value="graph.updated_at" />
      </b-col>
    </b-row>

    <graph-table class="my-5" :items="graph.nodes" :adjs="adjacencies" />
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import StatisticCard from "@/components/ui/StatisticCard";
import GraphTable from "@/components/graphs/GraphTable.vue";

export default {
  components: { StatisticCard, GraphTable },
  computed: {
    ...mapGetters({
      graph: "graph",
      adjacencies: "adjacencies"
    }),
    nodesNumber() {
      if (this.graph) return this.graph.nodes.length;
      else return null;
    },
    edgesNumber() {
      if (this.graph) return this.graph.edges.length;
      else return null;
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.setCurrentGraphId(id);
  },
  methods: {
    ...mapActions({
      setCurrentGraphId: "setCurrentId"
    })
  }
};
</script>

<style></style>
