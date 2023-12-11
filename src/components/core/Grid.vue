<script setup lang="ts">
import { StyleValue, computed, inject } from "vue";
import { Store, storeKey } from "../../store";

const store = inject<Store>(storeKey)!;
const isVisible = computed(
  () =>
    ({
      visibility: store.gameState.time.isActive ? "visible" : "hidden",
    } as StyleValue)
);
</script>

<template>
  <section v-if="!store.gameState.isWinner">
    <div
      v-for="cell in store.gameState.cells"
      :class="[
        cell.isSelected ? 'active' : '',
        cell.isAssociated ? 'associated' : '',
        cell.isReadOnly ? 'generated' : '',
        cell.hasWrongValue ? 'wrong' : '',
        cell.hasAssociatedValue ? 'match-number' : '',
        Array.isArray(cell.value) ? 'display-notes' : '',
      ]"
      @click="store.methods.onSelectCell(cell.id)">
      <span
        class="notes-number"
        v-if="Array.isArray(cell.value)"
        v-for="value in cell.value"
        :style="isVisible">
        {{ value }}
      </span>
      <span v-else :style="isVisible">{{ cell.value }}</span>
    </div>
  </section>
  <section v-else>
    <h1>WINNER!!!</h1>
  </section>
</template>

<style scoped>
h1 {
  font-size: 2.5rem;
  grid-column: 3 / -1;
  grid-row: 3 / -1;
}
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

.match-number {
  background-color: var(--bg-color-5);
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

.display-notes {
  display: grid;
  grid-template-columns: repeat(3, 19px);
  grid-template-rows: repeat(3, 19px);
  text-align: center;
}

.notes-number {
  font-size: 16px;
}
</style>
