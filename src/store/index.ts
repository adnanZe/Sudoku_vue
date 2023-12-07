import { reactive } from "vue";
import { SudokuState } from "../model/sudoku";
import { generateInitialSudokuState } from "../services/core";

export interface Store {
    gameState: SudokuState;
    methods: {};
}

const gameState: SudokuState = reactive({
    cells: generateInitialSudokuState()
})

const methods = {
    onSelectCell: (id: number) => {
        gameState.cells.forEach(cell => {
            cell.isSelected = cell.id === id;
        });
    }
}

export default <Store>{
    gameState,
    methods
};