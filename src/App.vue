<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Core from "./components/core/Core.vue";
</script>

<template>
  <Header></Header>
  <Core></Core>
  <Footer></Footer>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

@media only screen and (min-width: 992px) {
  main {
    flex-direction: row;
  }
}
</style>
