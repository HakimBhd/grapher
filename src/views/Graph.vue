<template>
  <b-container v-if="graph" class="my-5">
    <div class="display-4" v-text="graph.name" />
    <p class="lead" v-text="graph.desc" />
    
    <hr />
    <div class="my-2 d-flex">
      <b-button class="mr-2" variant="primary" :to="`/graphs/${graph.id}/edit`">
        edit
      </b-button>
      <b-button class="mr-2" variant="primary" :to="`/graphs/${graph.id}/statistics`">
        statistics
      </b-button>
      <b-button variant="danger" @click="onDelete">
        delete
      </b-button>
    </div>
    <div>
      <graph-editor :data="graph" />
    </div>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GraphEditor from "@/components/graphs/GraphEditor";

export default {
  name: "Graph",
  components: {
    GraphEditor
  },
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
