<script setup lang="ts">
import { provide } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Core from "./components/core/Core.vue";
import store from "./store/index";
import { storeKey } from "./model/symbols";

provide(storeKey, store);
</script>

<template>
  <Header></Header>
  <Core></Core>
  <Footer></Footer>
</template>
