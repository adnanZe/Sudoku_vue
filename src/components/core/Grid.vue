<script setup lang="ts">
import { inject } from "vue";
import { Store, storeKey } from "../../store";

const store = inject<Store>(storeKey)!;
</script>

<template>
  <section>
    <div
      v-for="cell in store.gameState.cells"
      :class="[
        cell.isSelected ? 'active' : '',
        cell.hasAssociatedValue ? 'associated' : '',
        cell.isReadOnly ? 'generated' : '',
        cell.hasWrongValue ? 'wrong' : '',
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
  grid-gap: 2px;
}

section > :nth-child(3n) {
  margin-right: 4px;
}

section > div:nth-child(n + 19):nth-child(-n + 27),
section > div:nth-child(n + 46):nth-child(-n + 54) {
  margin-bottom: 4px;
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

.generated {
  color: var(--text-color);
}

.wrong {
  color: var(--text-danger);
  background-color: var(--bg-danger);
}

.wrong.generated {
  color: var(--text-danger-2);
  background-color: var(--bg-danger-2);
}
.active {
  background-color: var(--bg-color-3);
}
</style>
