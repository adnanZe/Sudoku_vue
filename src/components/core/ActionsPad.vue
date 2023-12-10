<script setup lang="ts">
import { inject } from "vue";
import { NUMBERS_PAD } from "../../model/constants";
import { Store, storeKey } from "../../store";

const store = inject<Store>(storeKey)!;
</script>

<template>
  <section>
    <button id="new-game" class="new-game" @click="store.methods.onNewGame()">
      New Game
    </button>
    <button id="undo" class="undo" @click="store.methods.onUndo()">
      <i class="fa-solid fa-rotate-left"></i>
    </button>
    <button id="erase" class="erase" @click="store.methods.onAddNumber('')">
      <i class="fa-solid fa-eraser"></i>
    </button>
    <button
      :class="['notes', store.gameState.isActiveNotes ? 'on' : '']"
      id="notes"
      @click="store.methods.onNotes()">
      <i class="fa-solid fa-pencil"></i>
    </button>
    <button
      class="number"
      v-for="number in NUMBERS_PAD"
      :key="number"
      @click="store.methods.onAddNumber(number)">
      {{ number }}
    </button>
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-template-columns: repeat(3, 75px);
  grid-template-rows: repeat(5, 75px);
  row-gap: 20px;
  column-gap: 5px;
  margin-left: 30px;
}

button {
  background-color: var(--bg-color-3);
  opacity: 0.8;
  font-size: 2.5rem;
  border: 0;
  border-radius: 10%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

button:hover {
  opacity: 1;
}

.number {
  padding: 0;
}

.undo {
  grid-column: 1;
  grid-row: 2;
}
.notes {
  grid-column: 3;
  grid-row: 2;
}
.erase {
  grid-column: 2;
  grid-row: 2;
}

.new-game {
  font-size: 2rem;
  background-color: rgba(50, 50, 50, 0.6);
  grid-column: 1 / 4;
}

.notes::before {
  content: "OFF";
  position: absolute;
  background-color: var(--bg-color-4);
  font-size: 1rem;
  width: 3rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  transform: translate(50px, -20px);
  color: var(--text-color-1);
}

.notes.on::before {
  content: "ON";
  background-color: var(--bg-color-2);
}
</style>
