
function filterBy(array, type) {
   if (type === 'null') {
      return array.filter(element => element !== null);
   } else if (type === 'object') {
      return array.filter(element => typeof(element) !== type && typeof(element) !== 'function' || element === null);
   } else {
      return array.filter(element => typeof(element) !== type || typeof(element) === 'function');
   }
}

inputArr = [1,null,2,'ads',undefined,3,'khjihi',[1,2,3],{},true,false,100n,Symbol("id"),filterBy];
console.log(filterBy(inputArr, 'object'));
