<template>
  <b-card
    height="180"
    :title="data.name"
    :sub-title="data.created_at"
  >
    <b-card-text>
      <div class="text-truncate" v-text="data.desc" />
    </b-card-text>
    <b-button variant="primary" :to="`/graphs/${data.id}`">View</b-button>
  </b-card>
</template>

<script>
export default {
  name: "GraphCard",
  props: ["data"]
};
</script>
