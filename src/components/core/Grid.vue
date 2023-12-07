<script setup lang="ts">
import { generateSudokuValues } from "../../services/core";
</script>

<template>
  <section>
    <div v-for="cell in generateSudokuValues()">
      {{ cell }}
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

section > div {
  background-color: var(--bg-color-2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}
</style>
