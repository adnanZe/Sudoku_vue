import { reactive } from "vue";
import { SudokuState } from "../model/sudoku";
import { generateInitialSudokuState } from "../services/core";


const gameState: SudokuState = reactive({
    cells: generateInitialSudokuState()
})

export default {
    gameState
};