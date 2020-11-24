const calcDisplay = document.querySelector('.calculator-display h1');
const inputBtn = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');
const equalSign = document.getElementById('equal-sign');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumValue(number){
    // Replace current display value if first val is entered
    if(awaitingNextValue){
        calcDisplay.textContent = number;
        awaitingNextValue = false;
    } else { 
    let displayVal = calcDisplay.textContent;
    if(displayVal !== '0'){
        calcDisplay.textContent += number;
    } else {
        calcDisplay.textContent = number;
    }
  }
}

function addDecimal(){
    // if operator pressed dont add decimal
    if(awaitingNextValue) return;
  if(!calcDisplay.textContent.includes('.')){
      calcDisplay.textContent = `${calcDisplay.textContent}.`;
  }
}

// Calculate first and second values depending on operator
const calculate = {
    '/' : (firstNumber, secNumber) => firstNumber / secNumber,
    '*' : (firstNumber, secNumber) => firstNumber * secNumber,
    '+' : (firstNumber, secNumber) => firstNumber + secNumber,
    '-' : (firstNumber, secNumber) => firstNumber - secNumber,
    '=' : (firstNumber, secNumber) => firstNumber
}

function useOperator(operator){
    const currentValue = Number(calcDisplay.textContent);
    // Prevent multiple operators
    if(operator && awaitingNextValue){
        operatorValue = operator;
        return;
    }
    // Assign first value if no value
    if(!firstValue){
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calcDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
    
}

// Add event listener for numbers,operators and decimals
inputBtn.forEach(button => {
    if(button.classList.length === 0){
        button.addEventListener('click', () => {
            sendNumValue(button.value);
        })
    } else if(button.classList.contains('operator')){
        button.addEventListener('click', () => {
            useOperator(button.value);
        })
    } else if(button.classList.contains('decimal')){
        button.addEventListener('click', addDecimal); 
    }
})

clearBtn.addEventListener('click', () => {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calcDisplay.textContent = '0';
})

