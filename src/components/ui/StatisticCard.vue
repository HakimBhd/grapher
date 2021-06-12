<template>
  <b-card :title="title">
    {{ value }}
  </b-card>
</template>

<script>
export default {
  props: ['title', 'value']
}
</script>

<style>

</style>