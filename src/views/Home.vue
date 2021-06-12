<template>
  <b-container class="my-5">
    <b-row>
      <b-col>
        <b-card title="New graph" sub-title="Create new graph">
          <b-card-text>
            <graph-form ref="graphForm" v-model="graph" />
          </b-card-text>
          <b-button variant="primary" class="mr-2" @click="submitGraph"
            >Submit</b-button
          >
          <b-button variant="danger" @click="resetGraphForm">Reset</b-button>
        </b-card>
      </b-col>
    </b-row>
    <hr class="my-12" />
    <b-row>
      <b-col v-for="(item, i) in graphs" :key="i" cols="12" md="4" sm="2">
        <graph-card :data="item" />
      </b-col>
    </b-row>
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
      this.resetGraphForm();
    },
    resetGraphForm() {
      this.$refs.graphForm.reset();
    }
  }
};
</script>
