<script setup lang="ts">
import Grid from "./Grid.vue";
import ActionsPad from "./ActionsPad.vue";
</script>

<template>
  <main>
    <Grid />
    <ActionsPad />
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

@media (min-width: 992px) {
  main {
    flex-direction: row;
  }
}
</style>
