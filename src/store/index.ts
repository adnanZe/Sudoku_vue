import { reactive, readonly } from "vue";
import { CellState, SudokuState } from "../model/sudoku";
import { generateInitialSudokuState } from "../services/core";

const cellsSudoku = generateInitialSudokuState();

export interface Store {
    gameState: SudokuState;
    methods: Methods;
}

interface Methods {
    onSelectCell: (id: number) => void;
    onAddNumber: (value: string) => void;
    onNotes: () => void;
    onUndo: () => void;
}

const gameState: SudokuState = reactive({
    cells: cellsSudoku,
    selectedCell: cellsSudoku[0],
    isActiveNotes: false,
    history: [],
});

const methods = {
    onSelectCell: (id: number) => {
        handleSelectCell(id);
    },

    onAddNumber: (value: string) => {
        handleAddNumber(value)
    },

    onNotes: () => {
        gameState.isActiveNotes = !gameState.isActiveNotes;
    },

    onUndo: () => {
        handleUndo();
    }
}

const handleUndo = () => {
    if (gameState.history.length > 0) {
        const lastCell = gameState.history.pop();
        if (lastCell) {
            gameState.cells[lastCell.id].value = lastCell.value;
            handleSelectCell(lastCell.id);
            checkWrongNumber();
        }
    }
}

const addHistory = (cell: CellState) => {
    const id = cell.id;
    let value: string | string[];

    if (Array.isArray(cell.value)) {
        value = [...cell.value];

    } else {
        value = cell.value;
    }

    gameState.history.push({ value, id });

}

const handleSelectCell = (id: number) => {
    gameState.cells.forEach(cell => {
        if (cell.id === id) {
            gameState.selectedCell = cell;
            cell.isSelected = true;
        } else if (cell.isSelected) {
            cell.isSelected = false;
        }
    });

    checkAssociatedCellsAndMatchingNumbers();
}

const handleAddNumber = (value: string) => {
    if (gameState.selectedCell.isReadOnly) return;
    addHistory(gameState.selectedCell);

    if (gameState.isActiveNotes) {
        if (Array.isArray(gameState.selectedCell.value)) {
            gameState.selectedCell.value[Number(value) - 1] = value === gameState.selectedCell.value[Number(value) - 1] ? "" : value;
        } else {
            gameState.selectedCell.value = Array(9).fill("");
            gameState.selectedCell.value[Number(value) - 1] = value;
        }
    } else {
        gameState.selectedCell.value = value;
    }
    checkWrongNumber();
}

const checkWrongNumber = () => {
    gameState.cells.forEach((cell: CellState) => {
        cell.hasWrongValue = false;
        gameState.cells.forEach((cellToCompare: CellState) => {
            cell.hasAssociatedValue = cell.value ? cell.value === gameState.selectedCell.value : false;
            if (
                cell.value == cellToCompare.value &&
                cell.value &&
                cellToCompare.value &&
                cell.id !== cellToCompare.id &&
                cellToCompare.associatedCellsId.includes(cell.id)
            ) {
                cell.hasWrongValue = true;
            }
        });
    });
}

const checkAssociatedCellsAndMatchingNumbers = () => {
    gameState.cells.forEach(cell => {
        cell.isAssociated = gameState.selectedCell.associatedCellsId.includes(cell.id);
        cell.hasAssociatedValue = cell.value ? cell.value === gameState.selectedCell.value : false;
    });
}



export default <Store>{
    gameState: readonly(gameState),
    methods
};

export const storeKey = Symbol("store");