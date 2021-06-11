<template>
  <b-container>
    <v-card title="Manage graph nodes">
    </v-card>
    <hr class="my-12" />
    <graph-editor />
  </b-container>
</template>

<script>
import GraphEditor from "@/components/graphs/GraphEditor";
export default {
  components: { GraphEditor }
};
</script>

<style></style>
