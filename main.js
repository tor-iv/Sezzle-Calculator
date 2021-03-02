// Main.js by Tor Cox
// declare html constants
const display1E1 = document.querySelector('.display-1');
const display2E1 = document.querySelector('.display-2');
const tempResultE1 = document.querySelector('.temp-reusult');
const numbersEl = document.querySelector('.number');
const operationEl = document.querySelector('.operation');
const equalEl = document.querySelector('.equal');
const clearALLE1 = document.querySelector('.all-clear');
const clearLastEl = document.querySelector('.last-entity-clear');

// declare variables
let dis1Num = '';
let dis2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;

// number function for when user clicks on a number
numbersE1.forEach( number => {
    number.addEventListener('click', (e)=> {
        if( e.target.innerText === '.' && !haveDot){
            haveDot = true;
        }
        else if(e.target.innertext === '. ' && haveDot) {
            return;
        }
        dis2Num += e.target.innerText;
        display2E1.innerText = dis2num;
    })
})

// called within mathOperation takes operation, clears variables and makes haveDot = false;
operationE1.forEach( operation=> {
    operation.addEventListener('click', (e)=> {
        if (!dis2Num) result;
        haveDot= false;
        const operationName = e.target.innerText;
        if(dis1Num && dis2Num && lastOperation){
            mathOperation();
        }else{
            result = parseFloat(dis2Num);
        }
        clearVar(operationName);
        lastOperation = operationName;
        console.log(result);
    })
})

// will need for the notepad around 42 mins
function clearVar(name = ''){
    dis1Num += dis2Num+ ' ' + name + ' ';
    display1E1.innerText = dis1Num;
    display2E1.innerText = '';
    dis2Num = '';
    dis2Num = '';
    tempResultE1.innerText = result;
} 

// function for what happens when click on operation button
function mathOperation() {
    if(lastOperation === 'X'){
        result = parseFloat(result) * parseFloat(dis2Num);
    } else if(lastOperation === '+') {
        result = parseFloat(result) + parseFloat(dis2Num);
    } else if (lastOperation === '-'){
        result = parseFloat(result) - parseFloat(dis2Num);
    } else if (lastOperation === '/'){
        result = parseFloat(result) / parseFloat(dis2Num);
    } else if (lastOperation === '%'){
        result = parseFloat(result) % parseFloat(dis2Num);
    } 
}

// equal function around 53 mins
equalE1.addEventListener('click', (e)=> {
    if(!dis1Num || !dis2Num ) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display2E1.innerText = result;
    tempResultE1.innerText = '';
    dis2num = result;
    dis1Num = '';
    // update the notepad
})

// when CE button pressed 
clearAllE1.addEventListener('click', (e) => {
    display1E1.innerText = '0';
    display2E1.innerText = '0';
    dis1Num = '';
    dis2Num == '';
    result == '';
    tempResultE1.innerText = '0';
})

// when C pressed
clearLastE1.addEventListener('click', (e) => {
    display2E1.innerText = '';
    displa2Num = '';
})

// adds keyboard functionality around 1hr
window.addEventListener('keydown', (e) => {
    if(
        e.key === '0' || e.key === '1' || 
        e.key === '2' || e.key === '3' || 
        e.key === '4' || e.key === '5' || 
        e.key === '6' || e.key === '7' || 
        e.key === '8' || e.key === '9' || 
        e.key === '.'
    ){ 
        clickButtonE1(e.key); 
    }
    else if (
        e.key === '+' || e.key === '/' ||
        e.key === '-' || 
        e.key === '%'
    ){
        clickOperation(e.key);
    }
    else if (e.key === '*') {
        clickOperation('X');
    }
    else if (e.key == 'Enter' || e.key === '=') {
        clickEqual();
    }
})

// check each button to see if matches
function clickButtonE1(key){
    numberE1.forEach(button => {
        if(button.innerText === key) {
            button.click();
        }
    })
}

function clickOperation(key){
    operationE1.forEcah(button => {
        if(button.innerText === key){
            button.click();
        }
    })
}

// run 
function clickEqual(){
    equalE1.click();
}

