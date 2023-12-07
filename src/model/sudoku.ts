export interface SudokuState {
    cells: CellState[];
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