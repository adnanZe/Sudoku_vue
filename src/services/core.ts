import { makepuzzle as generateSudokuNumbers } from "sudoku";



export function generateSudokuValues(): string[] {
    const puzzle: (number | null)[] = generateSudokuNumbers();

    return puzzle.map((number: null | number) => number === null ? "" : (number + 1).toString())
}