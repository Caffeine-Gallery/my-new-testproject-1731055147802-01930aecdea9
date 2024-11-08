import { backend } from 'declarations/backend';

const display = document.getElementById('display');

window.appendToDisplay = (value) => {
    display.value += value;
};

window.clearDisplay = () => {
    display.value = '';
};

window.calculate = async () => {
    const expression = display.value;
    const [num1, operator, num2] = expression.match(/(-?\d+\.?\d*)\s*([\+\-\*\/])\s*(-?\d+\.?\d*)/).slice(1);

    try {
        let result;
        switch (operator) {
            case '+':
                result = await backend.add(parseFloat(num1), parseFloat(num2));
                break;
            case '-':
                result = await backend.subtract(parseFloat(num1), parseFloat(num2));
                break;
            case '*':
                result = await backend.multiply(parseFloat(num1), parseFloat(num2));
                break;
            case '/':
                result = await backend.divide(parseFloat(num1), parseFloat(num2));
                break;
        }
        display.value = result.toString();
    } catch (error) {
        display.value = 'Error';
        console.error('Calculation error:', error);
    }
};
