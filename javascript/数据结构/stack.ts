function simpleCompute(str: string) {
  if (!str) return null;

  const numberStack: number[] = [];
  const operatorStack: string[] = [];
  const length = str.length;
  let i = 0;
  const numberReg = /[0-9]/;
  const operatorReg = /[\+\-\*\/]/;

  while (i < length) {
    const char = str.charAt(i);
    if (numberReg.test(char)) numberStack.push(Number(char));
    if (operatorReg.test(char)) {
      const lastOperator = operatorStack[operatorStack.length - 1];

      switch (char) {
        case '+':
        case '-':
          if (lastOperator) {
            operatorStack.pop();
            const number2 = numberStack.pop();
            const number1 = numberStack.pop();
            if (lastOperator === '+') {
              numberStack.push(number1 + number2);
            } else if (lastOperator === '-') {
              numberStack.push(number1 - number2);
            } else if (lastOperator === '*') {
              numberStack.push(number1 * number2);
            } else if (lastOperator === '/') {
              numberStack.push(number1 / number2);
            }
          }

          operatorStack.push(char);
          break;
        case '*':
        case '/':
          if (['*', '/'].includes(lastOperator)) {
            operatorStack.pop();
            const number2 = numberStack.pop();
            const number1 = numberStack.pop();
            if (lastOperator === '+') {
              numberStack.push(number1 + number2);
            } else if (lastOperator === '-') {
              numberStack.push(number1 - number2);
            } else if (lastOperator === '*') {
              numberStack.push(number1 * number2);
            } else if (lastOperator === '/') {
              numberStack.push(number1 / number2);
            }
          }
          
          operatorStack.push(char);
          break;
      }
    }

    i++;
  }
  console.log(numberStack.join());
  console.log(operatorStack.join());
  while (operatorStack.length) {
    const operator = operatorStack.pop();
    const number2 = numberStack.pop();
    const number1 = numberStack.pop();
    if (operator === '+') {
      numberStack.push(number1 + number2);
    } else if (operator === '-') {
      numberStack.push(number1 - number2);
    } else if (operator === '*') {
      numberStack.push(number1 * number2);
    } else if (operator === '/') {
      numberStack.push(number1 / number2);
    }
  }

  console.log(numberStack.join());
  console.log(operatorStack.join());

  return numberStack;
}

simpleCompute('1+2*3*9-5*2');
