export interface SudokuState {
    cells: CellState[];
    selectedCell: CellState;
    isActiveNotes: boolean;
}

export interface CellState {
    id: number;
    value: string;
    isSelected: boolean;
    isReadOnly: boolean;
    isAssociated: boolean;
    hasAssociatedValue: boolean;
    hasWrongValue: boolean;
    associatedCellsId: number[];
}