import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

// route level code-splitting this generates a separate chunk (about.[hash].js) for this route which is lazy-loaded when the route is visited.
/* webpackChunkName: "about" */

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/build",
      name: "build",
      component: () => import("./views/Build.vue")
    }
  ]
});
