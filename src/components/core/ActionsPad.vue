<script setup lang="ts">
import { NUMBERS_PAD } from "../model/constants";
</script>

<template>
  <section class="action-controls">
    <button id="new-game" class="new-game" @click="">New Game</button>
    <button id="undo" class="undo" @click="">
      <i class="fa-solid fa-rotate-left"></i>
    </button>
    <button id="erase" className="erase" @click="">
      <i className="fa-solid fa-eraser"></i>
    </button>
    <button className="notes" id="notes" @click="">
      <i className="fa-solid fa-pencil"></i>
    </button>
    <button
      v-for="number in NUMBERS_PAD"
      class="number"
      :key="number"
      :class="number"
      @click="">
      {{ number }}
    </button>
  </section>
</template>

<style scoped></style>
