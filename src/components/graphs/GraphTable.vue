<template>
  <b-table small outlined :fields="fields" :items="items" responsive="sm">
    <template #cell(adjs)="data">
      {{ adjs[data.item.id].join(", ") }}
    </template>
  </b-table>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    adjs: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    fields: [
      { key: "id", label: "Node ID" },
      { key: "name", label: "Node tooltip" },
      { key: "adjs", label: "Node neighbors" }
    ]
  })
};
</script>

<style></style>
