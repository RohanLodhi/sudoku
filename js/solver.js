const posCheck = (sudoku, pos) => {
    for(col=0;col<9;col++){
        for(row=0;row<9;row++){
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
    for(i=0;i<9;i++){
        if(sudoku[i][col] === num){
            return false;
        }
    }
    return true;
}

const usedInRow = (sudoku,row,num) => {
    for(i=0;i<9;i++){
        if(sudoku[row][i] === num){
            return false;
        }
    }
    return true;
}

const usedInBox = (sudoku, pos, num) => {
    row = Math.floor(pos[0]/3)*3;
    col = Math.floor(pos[1]/3)*3;

    for(i=row;i<row+3;i++){
        for(j=col;j<col+3;j++){
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
                console.log('possible')
                return true;
            }
        }
    }
    return false;
}
const sudokuSolver = (sudoku) => {
    pos = [0,0];
    availablePos = posCheck(sudoku, pos);
    if(!availablePos){
        return true;
    }
    for(i=1;i<10;i++){
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