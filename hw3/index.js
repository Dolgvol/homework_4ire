
inputArr = [1,null,2,'ads',undefined,3,'khjihi',[1,2,3],{},true,false,100n,Symbol("id"),filterBy];

function filterBy(array, type) {
   if (type === 'null') {
      return array.filter(element => element !== null);
   } else if (type === 'object') {
      return array.filter(element => typeof(element) !== type && typeof(element) !== 'function' || element === null);
   } else {
      return array.filter(element => typeof(element) !== type || typeof(element) === 'function');
   }
}
console.log(filterBy(inputArr, 'object'));


// более сложный вариант с заданным массивом названий типов и допобработкой входящего значения
function filterBy2(array, type) {
   if (typeof type === 'string') {
      let pureType = type.toLowerCase().trim();
      const allTypes = [
         'null',
         'undefined',
         'string',
         'number',
         'bigint',
         'boolean',
         'symbol',
         'object'   
      ];
      if (allTypes.includes(pureType)) {
         if (pureType === 'null') {
            return array.filter(element => element !== null);
         } else if (pureType === 'object') {
            return array.filter(element => typeof(element) !== pureType && typeof(element) !== 'function' || element === null);
         } else {
            return array.filter(element => typeof(element) !== pureType);
         }
      } else {
         console.log('введно неверное значение типа!');
         return array;
      }
   } else {
      console.log('аргумент type принимает только строку, введите ее!');
      return array;
   }
}
// console.log(filterBy2(inputArr, undefined));
