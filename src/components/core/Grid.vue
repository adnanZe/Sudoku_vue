<script setup lang="ts">
import { inject } from "vue";
import { storeKey } from "../../model/symbols";
import { Store } from "../../store";

const store = inject<Store>(storeKey);
</script>

<template>
  <section>
    <div v-for="cell in store?.gameState.cells">
      {{ cell.value }}
    </div>
  </section>
</template>

<style scoped>
section {
  margin: 1.5rem 0;
  display: grid;
  grid-template-columns: repeat(9, 60px);
  grid-template-rows: repeat(9, 60px);
  grid-gap: 1px;
}

div {
  background-color: var(--bg-color-2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}
</style>
