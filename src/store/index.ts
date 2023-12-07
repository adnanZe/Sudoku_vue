import { reactive, readonly } from "vue";
import { SudokuState } from "../model/sudoku";
import { generateInitialSudokuState } from "../services/core";

export interface Store {
    gameState: SudokuState;
    methods: Methods;
}

interface Methods {
    onSelectCell: (id: number) => void;
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
    gameState: readonly(gameState),
    methods
};

export const storeKey = Symbol("store");