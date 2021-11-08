
function countFibonacciNumber(firstNum, secondNum, index) {
   let f0 = firstNum;
   let f1 = secondNum;
   if (index === 0) {
      return f0;
   } else if (index === 1) {
      return f1;
   } else if (index > 1) {
      for (let i = 2; i <= index; i++) {
         let fi = f0 + f1;
         f0 = f1;
         f1 = fi;
      }
      return f1; 
   } else {
      for (let i = -1; i >= index; i--) {
         let fi = f1 - f0;
         f1 = f0;
         f0 = fi;
      }
      return f0; 
   }
}

let res = null;
do {
   let firstNumber = null;
   do {
      firstNumber = parseInt(prompt("Введите первый целочисленный член искомой последовательности Фибоначи",""), 10);
      if (!isFinite(firstNumber)) {
         alert("Вы ввели неверное значение!");
      }
   } while (!isFinite(firstNumber));

   let secondNumber = null;
   do {
      secondNumber = parseInt(prompt("Введите второй целочисленный член искомой последовательности Фибоначи",""), 10);
      if (!isFinite(secondNumber)) {
         alert("Вы ввели неверное значение!");
      }
   } while (!isFinite(secondNumber));

   let indexNumber = null;
   do {
      indexNumber = parseInt(prompt("Введите целочисленный порядковый номер искомого числа в последовательности Фибоначи",""), 10);
      if (!isFinite(indexNumber)) {
         alert("Вы ввели неверное значение!");
      }
   } while (!isFinite(indexNumber));

   let fibNumber = countFibonacciNumber(firstNumber, secondNumber, indexNumber);
   alert(`В последовательности Фибоначи начинающейся с ${firstNumber} и ${secondNumber}, число с номером ${indexNumber}: \n${fibNumber}`);
   res = confirm('Рассчитать еще одно число?');
} while (res);




