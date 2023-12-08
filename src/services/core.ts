import { makepuzzle as generateSudokuNumbers } from "sudoku";
import { CellState } from "../model/sudoku";
import getListOfIdsAssociated from "./rowColumnSquare";



function generateSudokuValues(): string[] {
    const puzzle: (number | null)[] = generateSudokuNumbers();

    return puzzle.map((number: null | number) => number === null ? "" : (number + 1).toString())
}

export function generateInitialSudokuState(): CellState[] {
    const values = generateSudokuValues();

    return values.map((value: string, index: number) => ({
        id: index,
        value,
        isSelected: index === 0,
        isReadOnly: value !== "",
        hasAssociatedValue: false,
        hasWrongValue: false,
        associatedCellsId: getListOfIdsAssociated(index)
    }));
}