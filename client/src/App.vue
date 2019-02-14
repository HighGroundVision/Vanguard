<!-- @format -->

<template>
  <div id="app">
    <Layout>
      <Header class="layout-header-bar">
        <Menu mode="horizontal" theme="light" active-name="home">
          <MenuItem name="home">
            <RouterLink to="/">
              Home
            </RouterLink>
          </MenuItem>
          <MenuItem name="build">
            <RouterLink to="/build">
              Build
            </RouterLink>
          </MenuItem>
          <MenuItem name="about">
            <RouterLink to="/about">
              About
            </RouterLink>
          </MenuItem>
        </Menu>
      </Header>
      <Content>
        <RouterView></RouterView>
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
  name: "App"
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
