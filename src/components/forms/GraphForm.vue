<template>
  <b-form ref="form">
    <b-form-group label="Name" label-for="name-input">
      <b-form-input
        v-model="graph.name"
        id="descc-input"
        placeholder="Name"
      ></b-form-input>
    </b-form-group>
    <b-form-group label="Description" label-for="desc-input">
      <b-form-textarea
        v-model="graph.desc"
        id="descc-input"
        placeholder="Enter something..."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  name: "GraphForm",
  props: {
    value: {
      type: Object,
      default: () => ({
        name: null,
        desc: null
      })
    }
  },
  data() {
    return {
      graph: this.value
    };
  },
  watch: {
    graph: {
      handler(v) {
        this.$emit("input", v);
      },
      deep: true
    }
  },
  methods: {
    validate() {
      if (this.graph.name && this.graph.desc) return true;
      window.alert("Missing name or description");
    },
    reset() {
      this.graph = {
        name: null,
        desc: null
      };
    }
  }
};
</script>

<style></style>
