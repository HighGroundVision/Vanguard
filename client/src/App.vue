<template>
  <div id="app">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="home">
          <MenuItem name="home">
            <router-link to="/">Home</router-link>
          </MenuItem>
          <MenuItem name="build">
            <router-link to="/build">Build</router-link>
          </MenuItem>
          <MenuItem name="about">
            <router-link to="/about">About</router-link>
          </MenuItem>
        </Menu>
      </Header>
      <Content>
        <router-view></router-view>
      </Content>
      <Footer>
        <div class="">
          © 2019 - High Ground Vision
        </div>
      </Footer>
    </Layout>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
.ivu-layout-content {
  padding: 25px 50px;
}
</style>
