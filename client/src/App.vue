<template>
  <div id="app">
    <Layout>
      <Header class="layout-header-bar">
        <Menu mode="horizontal" theme="light" active-name="home">
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
      <Footer class="layout-footer-bar">
        <div>
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
html {
  background-color: #f5f7f9;
}
.layout-header-bar {
  background: #fff !important;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-footer-bar {
  text-align: center;
}
.ivu-layout-content {
  padding: 25px 50px;
}
</style>
