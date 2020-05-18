'use strict';
const submit = document.querySelector('button')

const sliceArray = arr => {
    const row1 = arr.slice(0,9);
    const row2 = arr.slice(9,18);
    const row3 = arr.slice(18,27);
    const row4 = arr.slice(27,36);
    const row5 = arr.slice(36,45);
    const row6 = arr.slice(45,54);
    const row7 = arr.slice(54,63);
    const row8 = arr.slice(63,72);
    const row9 = arr.slice(72,81);
    
    arr = [row1,row2,row3,row4,row5,row6,row7,row8,row9];
    return arr;
};

const checkSudoku = board => {
    for(let i=0;i<9;i++){
        let val = [];
        for(let j=0;j<9;j++){
            if(val.includes(board[j][i]) && board[j][i] !== 0){
                return true;
            }
            val.push(board[j][i]);
        }
    }
    for(let i=0;i<9;i++){
        let val = []
        for(let j=0;j<9;j++){
            if(val.includes(board[i][j]) && board[i][j] !== 0){
                return true;
            }
            val.push(board[i][j]);
        }
    }
    return false;
}

const alertUser = () => {
    const popup = document.querySelector('.popup-wrapper');
    const close = document.querySelector('.popup-close');
    popup.style.display = 'block';

    close.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    popup.addEventListener('click', (e) => {
        if(e.target.className === 'popup-wrapper'){
            popup.style.display = 'none';
        }
    });
}

const clearInputs = () => {
    const button = document.querySelector('.display');
    button.style.display = 'block'

    button.addEventListener('click', () =>{
        const clearInputs = document.querySelectorAll('input')
        clearInputs.forEach(input => {
            input.value = ''
        })
        button.style.display = 'none'
    })
}

submit.addEventListener('click', e => {
    e.preventDefault();
    let values = [];
    document.querySelectorAll('input').forEach(input => {
        if(input.value === "" || isNaN(input.value)){
            values.push(0);
        }
        else{
            values.push(parseInt(input.value));
        }
    });
    console.log(values)
    let sudoku = sliceArray(values);
    if(checkSudoku(sudoku)){
        alertUser()
    }
    else{
        sudoku = sudokuSolver(sudoku)
        if(!sudoku){
            alertUser()
        } else{
            let a=0;
            let b=0;
            console.log('trying')
            document.querySelectorAll('input').forEach(input => {
                input.value = sudoku[b][a];
                a++;
                if(a===9){
                    a = 0;
                    b++
                }
            })
            clearInputs()
        }
    }

})