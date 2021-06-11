<template>
  <b-container class="my-5">
    <v-row>
      <v-col>
        <b-card title="New graph" sub-title="Create new graph">
          <v-card-text>
            <graph-form ref="graphForm" v-model="graph" />
          </v-card-text>
          <b-card-actions>
            <b-button variant="primary" @click="submitGraph">Submit</b-button>
            <b-button variant="danger">Reset</b-button>
          </b-card-actions>
        </b-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(item, i) in graphs" :key="i" cols="12" md="3" sm="4">
        <graph-card :data="item" />
      </v-col>
    </v-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GraphForm from "@/components/forms/GraphForm";
import GraphCard from "@/components/graphs/GraphCard";

export default {
  name: "Home",
  components: {
    GraphForm,
    GraphCard
  },
  data: () => ({
    graph: {}
  }),
  computed: {
    ...mapGetters({
      graphs: "graphs"
    })
  },
  methods: {
    ...mapActions({
      addGraph: "addGraph"
    }),
    submitGraph() {
      if (!this.$refs.graphForm.validate()) return;
      this.addGraph(this.graph);
    },
    resetGraphForm() {
      this.$refs.graphForm.reset();
    }
  }
};
</script>
