<script setup lang="ts">
import { inject } from "vue";
import { Store, storeKey } from "../../store";

const store = inject<Store>(storeKey)!;

console.log(store.gameState.cells);
</script>

<template>
  <section>
    <div
      v-for="cell in store.gameState.cells"
      :class="[
        cell.isSelected ? 'active' : '',
        cell.hasAssociatedValue ? 'associated' : '',
        cell.isReadOnly ? 'generated' : '',
      ]"
      @click="store.methods.onSelectCell(cell.id)">
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
.associated {
  background-color: var(--bg-color-4);
}

.active {
  background-color: var(--bg-color-3);
}

.generated {
  color: var(--text-color);
}
</style>
