class Matrix {
    constructor (numRows, numColums) {
        this.matrix = this.generateMatrix(numRows, numColums)
    }


    generateMatrix(numRows, numColumns) {
        let matrix = []
        let num = 1
        
        for (let r = 0; r < numRows; r++) {
            matrix.push([])
            for (let c = 0; c < numColumns; c++) {
                matrix[r].push(num++)
            }
        }
        return matrix
    }

    print() {
        console.log('\n')
        for (let r = 0; r < this.matrix.length; r ++) {
            let rowStr = ""
            for (let c = 0; c < this.matrix[r].length; c ++) {
                rowStr += `${this.matrix[r][c]}\t`
            }
            console.log(rowStr)
        }
    }

    get(rowNum, colNum) {
        return this.matrix[rowNum][colNum]
    }

    getColumn(colNum) {
        let column = []
        for (let i = 0; i < this.matrix.length; i++) {
            column.push(this.matrix[i][colNum])
        }
        return column
    }

    printColumn(colNum) {
        console.log(this.getColumn(colNum))
    }

    getRow(rowNum) {
        let row =[]
        for (let c = 0; c < this.matrix[rowNum].length; c ++) {
            row.push(this.matrix[rowNum][c])
        }
        return row
    }

    printRow(rowNum) {
        console.log(this.getColumn(rowNum))
    }

    alter(rowNum, colNum, newValue) {
        this.matrix[rowNum][colNum] = newValue
    }

    findCoordinate(value) {
        for (let r = 0; r < this.matrix.length; r ++) {
            for (let c = 0; c < this.matrix[r].length; c ++) {
                if (this.get(r,c) == value) {
                    return { x: r, y: c }
                }
            }
        }
    }
}


class TicTacToe extends Matrix {
    constructor (matrix) {
        super(matrix)
        this.previousPlayer
        this.turns = 0
    }

    loadBoard() {
        let newMatrix = []
       
        for (let r = 0; r < 3; r++) {
            newMatrix.push([])
            for (let c = 0; c < 3; c++) {
                newMatrix[r].push(".")
            }
        }
        this.matrix = newMatrix
    }

    checkDiagonals() {
        if (this.matrix[1][1] === ".") {
            return false
        }
        if (this.matrix[0][0] === this.matrix[1][1] && this.matrix[1][1] === this.matrix[2][2]) {
            return true
        }
        else if (this.matrix[2][0] === this.matrix[1][1] && this.matrix[1][1] === this.matrix[0][2]) {
            return true
        }
        else {
            return false
        }
    }

    checkIfEqual(array) {
        if (array.some(a => a === ".")) {
            return false
        }
        return array.every(a => a === array[0])
    }

    checkForThree() {
        for (let r = 0; r < 3; r ++) {
            if (this.checkIfEqual(this.getRow(r))) {
                return true
            }
        }
        for (let c = 0; c < 3; c ++) {
            if (this.checkIfEqual(this.getColumn(c))) {
                return true
            }
        }
        if(this.checkDiagonals()) {
            return true
        }
        return false
    }

    checkPositionFree(rowNum, columnNum) {
        return this.get(rowNum, columnNum) === "." ? true : false
    }

    invalidPlay(rowNum, columnNum, player) {
        if (!this.checkPositionFree(rowNum, columnNum)) {
            console.log("The position has already been played!")
            return true
        }
        else if (this.previousPlayer === player) {
            console.log(`Player ${player} has already had their turn.`)
            return true
        }
        else {
            return false
        }
    }

    resetGame() {
        this.turns = 0
        this.previousPlayer = null
        this.loadBoard()
        this.print()
    }

    getPlayerMarker(player) {
        return player == 1 ? "x" : "o"
    }

    play(rowNum, columnNum, player) {
        if (this.invalidPlay(rowNum, columnNum, player)) { return }

        this.alter(rowNum, columnNum, this.getPlayerMarker(player))
        this.print()
        this.turns ++
        this.previousPlayer = player

        if (this.checkForThree()) {
            console.log(`Congratulations Player ${player}`)
            this.resetGame()
        }
        else if (this.turns === 9) {
            console.log("The game is a draw. Start over.")
            this.resetGame()
        }
    }
}


let board = new TicTacToe()
board.loadBoard()

board.play(2, 2, 1)
board.play(0, 0, 0)
board.play(2, 2, 1)
board.play(1, 1, 2)
board.play(1, 0, 1)
board.play(0, 1, 2)
board.play(2, 0, 2)
board.play(2, 0, 1)
board.play(0, 2, 2)

board.play(1, 0, 1)
board.play(1, 2, 2)
board.play(0, 2, 1)
board.play(0, 0, 2)
board.play(0, 1, 1)
board.play(1, 1, 2)
board.play(2, 1, 1)
board.play(2, 0, 2)
board.play(2, 2, 1)