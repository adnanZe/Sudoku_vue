interface RowsColumnsSquaresObj<T = Array<number[]>> {
    rows: T;
    columns: T;
    squares: T;
}

type rowColumnSquare = number[] | null;

function getIdsRowsColumnsSquares() {
    const RowColumnSqrObject: RowsColumnsSquaresObj = {
        rows: [],
        columns: [],
        squares: [],
    };

    let counterColumn = -1;
    let counterSquare = 0;
    let row: rowColumnSquare = null;
    let column: rowColumnSquare = null;
    let square: rowColumnSquare = null;

    for (let i = 0; i < 81; i++) {
        if (i % 9 == 0) {
            counterColumn++;
            row = [];
            column = [];
            square = [];

            RowColumnSqrObject.rows.push(row);
            RowColumnSqrObject.columns.push(column);
            RowColumnSqrObject.squares.push(square);
        }

        if (i % 27 == 0) {
            counterSquare = 0;
        } else if (i % 9 == 0) {
            counterSquare -= 18;
        } else if (i % 3 == 0) {
            counterSquare += 6;
        }
        row!.push(i);
        column!.push((i % 9) * 9 + counterColumn);
        square!.push(i + counterSquare);
    }

    return RowColumnSqrObject;
}

const idsRowsColumnsSquares = getIdsRowsColumnsSquares();

export default function getListOfIdsAssociated(selectedCellId: number): number[] {
    const { rows, columns, squares } = idsRowsColumnsSquares;

    const rowList: number[] | undefined = rows.find((row) =>
        row.includes(selectedCellId)
    );
    const colList: number[] | undefined = columns.find((col) =>
        col.includes(selectedCellId)
    );
    const sqrList: number[] | undefined = squares.find((sqr) =>
        sqr.includes(selectedCellId)
    );

    return rowList!.concat(colList!, sqrList!);
}
