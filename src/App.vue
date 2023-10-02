<template>
  <v-app>
    <v-app-bar app dark>
      <router-link to="/" tag="div">Forsit Dashboard</router-link>

      <v-spacer></v-spacer>

      <v-btn text to="products">
        <span class="mr-2">Add new product</span>
      </v-btn>
      <v-btn text to="inventory">
        <span class="mr-2">Manage inventory</span>
      </v-btn>
    </v-app-bar>

    <v-main class="mt-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
