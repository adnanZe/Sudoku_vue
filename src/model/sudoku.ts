export interface SudokuState {
    cells: CellState[];
    selectedCell: CellState;
}

export interface CellState {
    id: number;
    value: string;
    isSelected: boolean;
    isReadOnly: boolean;
    hasAssociatedValue: boolean;
    hasWrongValue: boolean;
    associatedCellsId: string[];
}