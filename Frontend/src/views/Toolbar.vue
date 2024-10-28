<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>My Shop</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/products">Products</v-btn>
      <v-btn text to="/cart">Cart</v-btn>
      <v-btn text to="/admin">Admin</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>