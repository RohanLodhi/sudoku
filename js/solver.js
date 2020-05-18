'use strict';
const posCheck = (sudoku, pos) => {
    for(let col=0;col<9;col++){
        for(let row=0;row<9;row++){
            if(sudoku[row][col] == 0){
                pos[0] = row;
                pos[1] = col;
                return pos;
            }
        }
    }
    return false;
}

const usedInCol = (sudoku,col,num) => {
    for(let i=0;i<9;i++){
        if(sudoku[i][col] === num){
            return false;
        }
    }
    return true;
}

const usedInRow = (sudoku,row,num) => {
    for(let i=0;i<9;i++){
        if(sudoku[row][i] === num){
            return false;
        }
    }
    return true;
}

const usedInBox = (sudoku, pos, num) => {
    const row = Math.floor(pos[0]/3)*3;
    const col = Math.floor(pos[1]/3)*3;

    for(let i=row;i<row+3;i++){
        for(let j=col;j<col+3;j++){
            if(sudoku[i][j] === num){
                return false;
            }
        }
    }
    return true;
}

const numCheck = (sudoku,pos,i) => {
    if(usedInCol(sudoku,pos[1],i)){
        if(usedInRow(sudoku,pos[0],i)){
            if(usedInBox(sudoku,pos,i)){
                return true;
            }
        }
    }
    return false;
}
const sudokuSolver = (sudoku) => {
    let pos = [0,0];
    const availablePos = posCheck(sudoku, pos);
    if(!availablePos){
        return true;
    }
    for(let i=1;i<10;i++){
        if(numCheck(sudoku,availablePos,i)){
            sudoku[availablePos[0]][availablePos[1]] = i;

            if(sudokuSolver(sudoku)){
                return sudoku;
            }
            sudoku[availablePos[0]][availablePos[1]] = 0;
        }
    }
    return false;
}