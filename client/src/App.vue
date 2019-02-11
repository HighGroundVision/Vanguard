<template>
  <div id="app">
      <div>
        <router-link to="/foo">Go to Foo</router-link>
        <br />
        <router-link to="/bar">Go to Bar</router-link>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style></style>
