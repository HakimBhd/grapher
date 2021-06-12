<template>
  <div>
    <b-row no-gutters class="py-4" align-h="start" align-v="center">
      <b-avatar
        v-if="edge.sid"
        variant="lightÎ"
        class="text-danger"
        :text="edge.sid.name"
      ></b-avatar>
      <hr v-show="edge.sid" class="px-5 mx-2 bg-dark" />
      <div v-if="edge.tid.length">
        <b-avatar
          v-for="tid in edge.tid"
          :key="tid.id"
          variant="light"
          class="text-success mr-1"
          :text="tid.name"
        ></b-avatar>
      </div>
    </b-row>
    <div>
      <b-button class="mr-2" variant="success" @click="$emit('submit')"
        >add</b-button
      >
      <b-button variant="danger" @click="reset">reset</b-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        tid: null,
        sid: null
      })
    }
  },
  data() {
    return {
      edge: this.value
    };
  },
  watch: {
    edge: {
      handler(v) {
        this.$emit("input", v);
      },
      deep: true
    }
  },
  methods: {
    reset() {
      this.edge.tid = [];
      this.edge.sid = null;
    }
  }
};
</script>

<style></style>
