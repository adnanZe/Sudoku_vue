<script setup lang="ts"></script>
<template>
  <header class="glasses-container">
    <img src="../assets/sudokuLogo.png" alt="logo-img" />
    <span> Sudoku Vue</span>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
}

span {
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 0.5rem;
}

header > img {
  height: 40px;
}
</style>
