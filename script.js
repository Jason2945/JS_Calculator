// The initial screen text will be blank
let screenText = ""
// Make an array to store the math operators to match the class in index
let operators = ['multiply', 'divide', 'subtract', 'add']
// Make an array to store the operator symbol and use it for Math function later
let symbolOperators = ['/', '*', '-', '+']
//Check what the user inputted right now.
let currentChar = ""

// Get the screen to display the value that the user presses
const currentScreen = document.getElementsByClassName('screen')[0]
// Store all the buttons in allButtons
let allButtons = document.getElementsByClassName('calculatorButtons')[0].getElementsByTagName('button')

let answer = ""

let ding = new Audio("img/ding.mp3")

//Run a for loop to check if any of the button is pressed
for (let index = 0; index < allButtons.length; index++){
    allButtons[index].addEventListener("click", function(){
        buttonPressed(allButtons[index]['className'])
    });
}

//This is used to replace a char at a location to another char
//Useful for  changing operation signs so user can't input 2 operation signs together
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

// This function checks on which button the user presses and outputs it to the screen
function buttonPressed(classValue){
    // This first if statement makes sure that if an operator is pressed, it will put a 0 in the beginning
    // This way there is math to be done and error won't pop out.
    if (screenText === ""){
        if (operators.includes(classValue)){
            screenText += 0
        }
    }
    switch(classValue){
        case 'clear':
            answer = ""
            screenText = "";
            currentChar = "";
            break;
        case 'num1' :
            currentChar = '1';
            break;
        case 'num2' :
            currentChar = '2';
            break;
        case 'num3' :
            currentChar = '3';
            break;
        case 'num4' :
            currentChar = '4';
            break;
        case 'num5' :
            currentChar = '5';
            break;
        case 'num6' :
            currentChar = '6';
            break;
        case 'num7' :
            currentChar = '7';
            break;
        case 'num8' :
            currentChar = '8';
            break;
        case 'num9' :
            currentChar = '9';
            break;
        case 'num0' :
            currentChar = '0';
            break;
        case 'divide' :
            currentChar = '/';
            break;
        case 'multiply' :
            currentChar = '*';
            break;
        case 'subtract' :
            currentChar = '-';
            break;
        case 'add' :
            currentChar = '+' ;
            break;
        case 'decimal' :
            currentChar = '.';
            break;
        // When equal is pressed, runs the calculateValues function to do math
        case 'equal' :
            if(symbolOperators.includes(screenText[screenText.length - 1]) || screenText.length < 3) {
                currentChar = ""
                break;
            }else {
                currentChar = '=';
                ding.play()
                answer = convertToArray(screenText)
                break;
            } 
        }
    // This runs the setCharAt function to make sure that no two operators are next to each other
    if(symbolOperators.includes(screenText[screenText.length - 1]) && symbolOperators.includes(currentChar)) {
        screenText = setCharAt(screenText, screenText.length - 1, currentChar)
    }else{
        // Append the user input to the screenText variable
        screenText += currentChar;
    }
    if (answer !== ""){
        screenText = answer;
        answer = ""
    }
    // Output the screen text to html
    currentScreen.value = screenText;
}

// This function is to get the string and convert it to math function
function convertToArray(inputtedString){
    const expression = inputtedString.match(new RegExp(`\\d+(\\.\\d+)?|\\${symbolOperators.join('|\\')}`, 'g'));
    let doMath = 0;
    // Check if the expression is a negative number. If it is add a 0 so error doesn't occur.
    if (expression[0] === '-'){
        expression.splice(0,0, '0')
    }
    doMath = solveEquation(expression)
    return doMath
}

function solveEquation(expression){
    let combinedSum = 0
    while (expression.length > 1){

        if (expression.includes('*') && expression.includes('/')){
            if (expression.indexOf('*') < expression.indexOf('/')){
                let indexUsage = expression.indexOf('*')
                combinedSum = expression[indexUsage - 1] * expression[indexUsage + 1]
                expression.splice(indexUsage-1, 3, combinedSum)
                console.log("End Expression", expression)
            }else{
                console.log("Beginning Expression", expression)
                let indexUsage = expression.indexOf('/')
                combinedSum = expression[indexUsage - 1] / expression[indexUsage + 1]
                expression.splice(indexUsage-1, 3, combinedSum)
                console.log("End Expression", expression)
            }
        }
        else if (expression.includes('*')){
            console.log("Beginning Expression", expression)
            let indexUsage = expression.indexOf('*')
            combinedSum = expression[indexUsage - 1] * expression[indexUsage + 1]
            expression.splice(indexUsage-1, 3, combinedSum)
            console.log("End Expression", expression)
        }
        else if (expression.includes('/')){
            console.log("Beginning Expression", expression)
            let indexUsage = expression.indexOf('/')
            combinedSum = expression[indexUsage - 1] / expression[indexUsage + 1]
            expression.splice(indexUsage-1, 3, combinedSum)
            console.log("End Expression", expression)
        }
        else if (expression.includes('+') && expression.includes('-')){
            if (expression.indexOf('+') < expression.indexOf('-')){
                let indexUsage = expression.indexOf('+')
                combinedSum = Number(expression[indexUsage - 1]) + Number(expression[indexUsage + 1])
                expression.splice(indexUsage-1, 3, combinedSum)
                console.log("End Expression", expression)
            }else{
                console.log("Beginning Expression", expression)
                let indexUsage = expression.indexOf('-')
                combinedSum = Number(expression[indexUsage - 1]) - Number(expression[indexUsage + 1])
                expression.splice(indexUsage-1, 3, combinedSum)
                console.log("End Expression", expression)
            }
        }
        else if (expression.includes('+')){
            console.log("Beginning Expression", expression)
            let indexUsage = expression.indexOf('+')
            combinedSum = Number(expression[indexUsage - 1]) + Number(expression[indexUsage + 1])
            expression.splice(indexUsage-1, 3, combinedSum)
            console.log("End Expression", expression)
        }
        else if (expression.includes('-')){
            console.log("Beginning Expression", expression)
            let indexUsage = expression.indexOf('-')
            combinedSum = Number(expression[indexUsage - 1]) - Number(expression[indexUsage + 1])
            expression.splice(indexUsage-1, 3, combinedSum)
            console.log("End Expression", expression)
        }
    }
    return(combinedSum)
}