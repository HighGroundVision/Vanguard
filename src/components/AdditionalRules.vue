<template>
  <Tooltip placement="left">
    <span>Additional Rules</span>
    <div slot="content">
      <template v-for="(item, index) in rules">
        <p :key="index">{{item}}</p>
      </template>
    </div>
  </Tooltip>
</template>

<script>
export default {
  name: "AdditionalRules",
  props: {
    rules: Array,
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.float-right {
  float: right;
  margin: 3px;
}
</style>