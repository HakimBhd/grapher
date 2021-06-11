<template>
  <b-container v-if="graph">
    <!-- <graph-card :data="graph" /> -->
    <div class="display-1" v-text="graph.name" />
    <div class="overline" >id: #{{ graph.id }}</div>
    <p class="body-1" v-text="graph.desc" />
    <div class="body-1"> created at {{ graph.created_at }} </div>
    <div class="body-1"> updated at {{ graph.updated_at }} </div>
    
    <hr />
    <div class="mt-4 d-flex">
      <b-button class="mr-2" variant="primary" :to="`/graphs/${graph.id}/edit`">
        edit
      </b-button>
      <b-button variant="danger" @click="onDelete">
        delete
      </b-button>
    </div>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Graph",
  data: () => ({
    graph: null
  }),
  async mounted() {
    const id = this.$route.params.id;
    this.graph = await this.getGraph(id);
  },
  methods: {
    ...mapActions({
      getGraph: "getGraph",
      deleteGraph: "deleteGraph"
    }),
    onDelete() {
      this.deleteGraph(this.graph.id);
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
