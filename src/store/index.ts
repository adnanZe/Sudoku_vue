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
    onNewGame: () => void;
    onTimer: () => void;
    startTimer: () => void;
}

const gameState: SudokuState = reactive({
    cells: cellsSudoku,
    selectedCell: cellsSudoku[0],
    isActiveNotes: false,
    history: [],
    time: {
        time: 0,
        isActive: true,
        timerInterval: null
    },
    isWinner: false
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
    },

    onNewGame: () => {
        handleNewGame();
    },

    onTimer: () => {
        handleTimer();
    },

    startTimer: () => {
        startTimer();
    }
}

const handleTimer = () => {
    gameState.time.isActive = !gameState.time.isActive;
    if (gameState.time.isActive) {
        if (gameState.isWinner) {
            handleNewGame();
        } else {
            startTimer();
        }
    } else {
        pauseTimer();
    }
}

const startTimer = () => {
    gameState.time.isActive = true;
    gameState.time.timerInterval = setInterval(() => {
        gameState.time.time++;
    }, 1000);
}

const pauseTimer = () => {
    if (gameState.time.timerInterval) {
        clearInterval(gameState.time.timerInterval);
    }
    gameState.time.isActive = false;
}

const handleNewGame = () => {
    gameState.cells = generateInitialSudokuState();
    gameState.selectedCell = gameState.cells[0];
    gameState.isActiveNotes = false;
    gameState.history = [];

    pauseTimer();
    gameState.time = {
        time: 0,
        isActive: true,
        timerInterval: null
    };
    gameState.isWinner = false;
    startTimer();
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

    checkIfSudokuIsComplete();
}

const checkAssociatedCellsAndMatchingNumbers = () => {
    gameState.cells.forEach(cell => {
        cell.isAssociated = gameState.selectedCell.associatedCellsId.includes(cell.id);
        cell.hasAssociatedValue = cell.value ? cell.value === gameState.selectedCell.value : false;
    });
}

const checkIfSudokuIsComplete = () => {
    gameState.isWinner =
        gameState.cells.every(cell => cell.value && cell.value !== "" && !Array.isArray(cell.value) && !cell.hasWrongValue);

    if (gameState.isWinner) {
        pauseTimer();
    }
}


export default <Store>{
    gameState: readonly(gameState),
    methods
};

export const storeKey = Symbol("store");