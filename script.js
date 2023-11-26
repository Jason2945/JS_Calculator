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
// Stores the answer to be outputted when equal is pressed
let answer = ""
// The sound file that is played when equal is pressed
let ding = new Audio("img/ding.mp3")

// Allow users to enter numbers and operations on keyboard
currentScreen.addEventListener("keyup", (event =>{
    event.preventDefault();
    console.log(event);
    console.log('cancellable', event.cancelable);
    buttonPressed(event.key);
}));

//Run a for loop to check if any of the button is pressed on the screen
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
    if (screenText === "" && classValue !== 'Backspace'){
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
        case '1':
            currentChar = '1';
            break;
        case 'num2' :
        case '2':
            currentChar = '2';
            break;
        case 'num3' :
        case '3':
            currentChar = '3';
            break;
        case 'num4' :
        case '4':
            currentChar = '4';
            break;
        case 'num5' :
        case '5':
            currentChar = '5';
            break;
        case 'num6' :
        case '6':
            currentChar = '6';
            break;
        case 'num7' :
        case '7':
            currentChar = '7';
            break;
        case 'num8' :
        case '8':
            currentChar = '8';
            break;
        case 'num9' :
        case '9':
            currentChar = '9';
            break;
        case 'num0' :
        case '0':
            currentChar = '0';
            break;
        case 'divide' :
        case '/' :
            currentChar = '/';
            break;
        case 'multiply' :
        case '*' :
            currentChar = '*';
            break;
        case 'subtract' :
        case '-' :
            currentChar = '-';
            break;
        case 'add' :
        case '+' :
            currentChar = '+' ;
            break;
        case 'decimal' :
        case '.' :
            currentChar = '.';
            break;
        case 'delete':
        case 'Backspace':
            console.log(screenText)
            currentChar = "";
            screenText = screenText.slice(0, -1);
        // When equal is pressed, runs the calculateValues function to do math
        case 'equal' :
        case 'Enter' :
            // Check to make sure that it doesn't end in an operator and also the length is at least 3 to do math
            if(symbolOperators.includes(screenText[screenText.length - 1]) || screenText.length < 3) {
                currentChar = ""
                break;
            // Once condition is met, play the ding sound and convert the screen text to array so it can do math operations
            }else {
                //Run through decimal error function
                screenText = decimalError(screenText)
                currentChar = '=';
                ding.play()
                answer = convertToArray(screenText)
                break;
            } 
        default :
            currentChar = ""
        }

    // This runs the setCharAt function to make sure that no two operators are next to each other
    if(symbolOperators.includes(screenText[screenText.length - 1]) && symbolOperators.includes(currentChar)) {
        screenText = setCharAt(screenText, screenText.length - 1, currentChar)
    }else{
        // Append the user input to the screenText variable
        screenText += currentChar;
    }
    // Check to make sure there is an answer. If there is answer, it takes precedence to display
    if (answer !== ""){
        screenText = answer;
        answer = ""
    }
    // Output the screen text to html
    currentScreen.value = screenText;
    console.log(screenText)
}

// This function runs through the inputted string and make sure no error happens with the decimal
function decimalError(inputtedString){
    if (inputtedString.includes('.')){
        let decimalIndex = inputtedString.indexOf('.')
        // If before the decimal is an operator symbol, add a zero so the decimal doesn't disappear
        if(symbolOperators.includes(inputtedString[decimalIndex - 1])){
            inputtedString = inputtedString.slice(0, decimalIndex) + '0' + inputtedString.slice(decimalIndex)
        }
    }
    return inputtedString;
}

// This function is to get the string and convert it to math function
function convertToArray(inputtedString){
    // This match function converts the inputted string into an array and seperate it all by the symbol operators
    const expression = inputtedString.match(new RegExp(`\\d+(\\.\\d+)?|\\${symbolOperators.join('|\\')}`, 'g'));
    let doMath = 0;
    // Check if the expression is a negative number. If it is add a 0 so error doesn't occur. This also allows negative number to work
    if (expression[0] === '-'){
        expression.splice(0,0, '0')
    }
    doMath = solveEquation(expression)
    return doMath
}


// This function allows the user to do the math function in the array.
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