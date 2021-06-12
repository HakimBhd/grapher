<template>
  <b-form @submit.prevent>
    <b-form-group label="Name" label-for="name-input">
      <b-form-input
        v-model="node.name"
        id="name-input"
        placeholder="Name the node"
      ></b-form-input>
    </b-form-group>
    <b-form-group label="Eadges" for="edges-input" v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group
        v-model="node.edges"
        id="edges-input"
        value-field="id"
        text-field="name"
        :options="nodes"
        :aria-describedby="ariaDescribedby"
      ></b-form-checkbox-group>
    </b-form-group>

    <b-button variant="primary" @click="$emit('save')">Save</b-button>
  </b-form>
</template>

<script>
export default {
  name: "NodeForm",
  props: {
    value: {
      type: Object,
      default: () => ({
        name: null,
        edges: []
      })
    },
    nodes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      node: this.value
    };
  },
  watch: {
    node: {
      handler(v) {
        this.$emit("input", v);
      },
      deep: true
    }
  },
  methods: {
    validate() {
      if (this.node.name) return true;
      window.alert("Missing name for the node");
    },
    reset() {
      this.node = {
        name: null,
        edges: []
      };
    }
  }
};
</script>

<style></style>
