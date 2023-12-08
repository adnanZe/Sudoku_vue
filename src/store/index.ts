import { reactive, readonly } from "vue";
import { SudokuState } from "../model/sudoku";
import { generateInitialSudokuState } from "../services/core";

const cellsSudoku = generateInitialSudokuState();

export interface Store {
    gameState: SudokuState;
    methods: Methods;
}

interface Methods {
    onSelectCell: (id: number) => void;
}

const gameState: SudokuState = reactive({
    cells: cellsSudoku,
    selectedCell: cellsSudoku[0]
});

const methods = {
    onSelectCell: (id: number) => {
        gameState.cells.forEach(cell => {
            if (cell.id === id) {
                gameState.selectedCell = cell;
                cell.isSelected = true;
            } else if (cell.isSelected) {
                cell.isSelected = false;
            }
        });
        checkAssociatedCells();
    }
}

const checkAssociatedCells = () => {
    gameState.cells.forEach(cell => {
        cell.hasAssociatedValue = gameState.selectedCell.associatedCellsId.includes(cell.id);
    });
}



export default <Store>{
    gameState: readonly(gameState),
    methods
};

export const storeKey = Symbol("store");