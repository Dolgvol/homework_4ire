
const usd = 1;
const eur = 0.861;
const gbp = 0.729;
const uah = 26.29;
const rub = 70.95;

let result = null;
do {
   let firstCurrencyInput = null;
   let firstCurrency = null;
      do {
          let firstInput = prompt('Выберите из списка название валюты которую хотите перевести и введите его в поле ниже: \n USD \n EUR \n GBP \n UAH \n RUB \n(в любом регистре)', '');
          if (firstInput !== null) {
            firstCurrencyInput = firstInput.trim().toUpperCase();
            if (firstCurrencyInput === 'USD') {
               firstCurrency = usd;
            } else if (firstCurrencyInput === 'EUR') {
               firstCurrency = eur;
            } else if (firstCurrencyInput === 'GBP') {
               firstCurrency = gbp;
            } else if (firstCurrencyInput === 'UAH') {
               firstCurrency = uah;
            } else if (firstCurrencyInput === 'RUB') {
               firstCurrency = rub;
            } else {
               alert('Неверное значение!');
            }
          } else {
            alert('Введите значение!');
          }
      } while (!firstCurrency);
      

   let firstAmountInput = null;
   let firstAmount = null;
      do {
         let firstNumber = prompt(`Введите сумму ${firstCurrencyInput}, которую хотите перевести`, '');
         if (firstNumber !== null) {
            firstAmountInput = parseFloat(firstNumber);
            if (isFinite(firstAmountInput)) {
               firstAmount = parseFloat(firstAmountInput.toFixed(2));
            } else {
               alert('Неверное значение!');
            }
         } else {
            alert('Введите значение!');
         }
      } while (!firstAmount);
      

   let secondCurrencyInput = null;
   let secondCurrency = null;
   do {
      let secondInput = prompt('Выберите из списка название валюты которую хотите перевести и введите его в поле ниже: \n USD \n EUR \n GBP \n UAH \n RUB \n(в любом регистре)', ''); 
      if (secondInput !== null) {
         secondCurrencyInput = secondInput.trim().toUpperCase();
         if (secondCurrencyInput === 'USD') {
            secondCurrency = usd;
         } else if (secondCurrencyInput === 'EUR') {
            secondCurrency = eur;
         } else if (secondCurrencyInput === 'GBP') {
            secondCurrency = gbp;
         } else if (secondCurrencyInput === 'UAH') {
            secondCurrency = uah;
         } else if (secondCurrencyInput === 'RUB') {
            secondCurrency = rub;
         } else {
            alert('Неверное значение!');
         }
      } else {
         alert('Введите значение!');
       }
   } while (!secondCurrency);

   let secondAmount = ((firstAmount * secondCurrency) / firstCurrency).toFixed(2);
   alert(`Итого: ${secondAmount} ${secondCurrencyInput}`);

   result = confirm('Произвести конвертацию еще раз?');
} while (result);