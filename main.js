const Equations = {
    sum(number1, number2) {
        return number1 + number2;
    },

    subtract(number1, number2) {
        return number1 - number2;
    },

    multiplication(number1, number2) {
        return number1 * number2;
    },

    divide(number1, number2) {
        return number1 / number2;;
    },

}

const Get = {    
    currentAcumulator: '',  // apenas os numeros
    currentOperator: '',    // operador digitado por último
    acumulatorTotal: [], // tudo que for digitado pelo usuario
    
    number(numberProps) {
        if (Calc.hasResult) {
            Calc.hasResult = false;
            Calc.clearAll();
        }
        if (Show.display.innerHTML.length <= Show.maxNumberDisplay) {
            if (Show.display.innerHTML === Get.currentOperator) {
                Show.display.innerHTML = '';
            }
            Show.display.innerHTML += numberProps;
            Get.currentAcumulator += numberProps;
        }
    },
    
    existsOperator: false,
    operator(operatorProps) {
        Get.acumulatorTotal.push(Get.currentAcumulator);
        if (Get.existsOperator) {
            Validate.msg(Get.currentOperator);
            return;
        } else {
            Get.currentOperator = operatorProps;
            Get.existsOperator = true;
            Get.currentAcumulator = '';
            Show.display.innerHTML = Get.currentOperator;
        }
    }, 
}

const Validate = {
    msg(operator) {      
        let operatorMsg = '';

        if (operator === '+') { operatorMsg = 'soma' };
        if (operator === '-') { operatorMsg = 'subtração' };
        if (operator === '/') { operatorMsg = 'divisão' };
        if (operator === '*') { operatorMsg = 'multiplicação' };

        return alert(`Antes de uma nova operação, realize a ${operatorMsg}`);
    }
}

const Calc = {
    hasResult: false,
    result() {
        Get.acumulatorTotal.push(Get.currentAcumulator);
        let number1 = parseFloat(Get.acumulatorTotal[0]);
        let number2 = parseFloat(Get.acumulatorTotal[1]);
        let result = '';

        if (Get.currentOperator === '+') { result = Equations.sum(number1, number2) };
        if (Get.currentOperator === '-') { result = Equations.subtract(number1, number2) };
        if (Get.currentOperator === '/') { result = Equations.divide(number1, number2) };
        if (Get.currentOperator === '*') { result = Equations.multiplication(number1, number2) };

        if (result != '') {
            Show.display.innerHTML = result;
            Calc.hasResult = true;
        }
    },

    clearAll() {
        Show.display.innerHTML = '';
        Get.currentAcumulator = '';
        Get.currentOperator = '';
        Get.acumulatorTotal = [];
        Get.existsOperator = false; 
    }
}

const Show = {   
    maxNumberDisplay: 10,
    display: document.getElementById('display'),
}

const Logs = {
    container: document.querySelector('.container'),

    init() {
        Logs.container.addEventListener('click', () => {
            // console.log('currentAcumulator:', Get.currentAcumulator);
            console.log('acumulatorTotal:', Get.acumulatorTotal);
            // console.log('currentOperator:', Get.currentOperator);
            console.log(Get.existsOperator);
            console.log(Calc.hasResult);
            
        })
    }
}

Logs.init(); 
