<template>
  <b-card
    height="180"
    :to="`/graphs/${data.id}`"
    :title="data.name"
    :sub-title="data.created_at"
  >
    <b-card-text>
      <div class="text-truncate" v-text="data.desc" />
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "GraphCard",
  props: ["data"]
};
</script>
