<script setup lang="ts">
import { NUMBERS_PAD } from "../model/constants";
</script>

<template>
  <section>
    <button id="new-game" class="new-game" @click="">New Game</button>
    <button id="undo" class="undo" @click="">
      <i class="fa-solid fa-rotate-left"></i>
    </button>
    <button id="erase" class="erase" @click="">
      <i class="fa-solid fa-eraser"></i>
    </button>
    <button class="notes" id="notes" @click="">
      <i class="fa-solid fa-pencil"></i>
    </button>
    <button
      class="number"
      v-for="number in NUMBERS_PAD"
      :key="number"
      @click="">
      {{ number }}
    </button>
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-template-columns: repeat(9, 20px);
  grid-template-rows: repeat(2, 40px);
  row-gap: 10px;
  column-gap: 5px;
}

button {
  background-color: rgb(38, 38, 38);
  opacity: 0.8;
  font-size: 1.5rem;
  font-weight: lighter;
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
  background-color: transparent;
  border-radius: 7px;
}

.undo {
  grid-column: 4/6;
}

.notes {
  grid-column: 8/10;
}

.erase {
  grid-column: 6/8;
}

.new-game {
  font-size: 1rem;
  background-color: rgba(50, 50, 50, 0.6);
  color: rgba(217, 217, 217);
  border-radius: 7px;
  grid-column: 1 / 4;
}

@media only screen and (min-width: 768px) {
  section {
    grid-template-columns: repeat(3, 75px);
    grid-template-rows: repeat(5, 75px);
    row-gap: 20px;
    column-gap: 5px;
    margin-left: 30px;
  }

  button {
    font-size: 2.5rem;
  }
  :not(.number) {
    border-radius: 50%;
  }

  .number {
    padding: 0;
    background-color: rgb(150, 150, 150);
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
    border-radius: 7px;
  }
}
</style>
