import Vue from "vue";
import VueRouter from "vue-router";
import AnalyticsPage from "../components/AnalyticsPage";
import ProductRegistrationPage from "../components/ProductRegistrationPage";
import InventoryManagementPage from "../components/InventoryManagementPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Analytics",
    component: AnalyticsPage,
  },
  {
    path: "/products",
    name: "Products",
    component: ProductRegistrationPage,
  },
  {
    path: "/inventory",
    name: "Inventory",
    component: InventoryManagementPage,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
