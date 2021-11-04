
const usd = 1;
const eur = 0.861;
const gbp = 0.729;
const uah = 26.29;
const rub = 70.95;

let result = null;
do {
   let firstCurrencyInput = prompt('Выберите из списка название валюты которую хотите перевести и введите его в поле ниже: \n USD \n EUR \n GBP \n UAH \n RUB \n(в любом регистре)', '').trim().toUpperCase();
   let firstCurrency = null;
      do {
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
            firstCurrencyInput = prompt('Выберите из списка название валюты которую хотите перевести и введите его в поле ниже: \n USD \n EUR \n GBP \n UAH \n RUB \n(в любом регистре)', '').trim().toUpperCase();
         }
      } while (!firstCurrency);
      

   let firstAmountInput = parseFloat(prompt(`Введите сумму ${firstCurrencyInput}, которую хотите перевести`, ''));
   let firstAmount = null;
      do {
         if (isFinite(firstAmountInput)) {
            firstAmount = parseFloat(firstAmountInput.toFixed(2));
         } else {
            alert('Неверное значение!');
            firstAmountInput = parseFloat(prompt(`Введите сумму ${firstCurrencyInput}, которую хотите перевести`, ''));   
         }
      } while (!firstAmount);
      

   let secondCurrencyInput = prompt(`Выберите из списка название валюты в которую хотите перевести ${firstAmount} ${firstCurrencyInput} и введите его в поле ниже: \n USD \n EUR \n GBR \n UAH \n RUB \n(в любом регистре)`, '').trim().toUpperCase();
   let secondCurrency = null;
   do {
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
         secondCurrencyInput = prompt('Выберите из списка название валюты которую хотите перевести и введите его в поле ниже: \n USD \n EUR \n GBP \n UAH \n RUB \n(в любом регистре)', '').trim().toUpperCase();   
      }
   } while (!secondCurrency);

   let secondAmount = ((firstAmount * secondCurrency) / firstCurrency).toFixed(2);
   alert(`Итого: ${secondAmount} ${secondCurrencyInput}`);

   result = confirm('Произвести конвертацию еще раз?');
} while (result);