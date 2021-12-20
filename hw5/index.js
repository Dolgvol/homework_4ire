 
// создаем элемент для отображения состояния памяти калькулятора, по дефолту он не отображается (память пуста)
 const memLabel = document.createElement('div');
 memLabel.classList.add('mem-label');
 memLabel.textContent = '';
 document.querySelector('.display').insertAdjacentElement('afterbegin', memLabel);

// выбираем и помещаем в константы инпуты из html
// итого имеется константа с экраном, содержимое которого изменяется, но на нем нет обработчиков
// и массив кнопок, содержимое которых неизменно, но на них висят обработчики
const screen = document.querySelector('.display input[type="text"]');
const buttons = document.querySelectorAll('.button');

// объект, описывающий текущее состояние калькулятора
// его значения меняются при выполнении операций на калькуляторе
let state = {
   currResult: 0,
   screenContent: '',
   action: null,
   memory: 0,
   memoryLabel: false,
   memoryClean: false,

   makeAction() {
      let changedScreenContent = parseFloat(this.screenContent);
      switch (this.action) {
         case '+':
            this.currResult += changedScreenContent;
             break
         case '-':
            this.currResult -= changedScreenContent;
             break
         case '*':
            this.currResult *= changedScreenContent;
             break
         case '/':
               this.currResult /= changedScreenContent;
             break 
         default:
            this.currResult = changedScreenContent;    
            break            
     }
   },

   clearState() {
      this.currResult = 0;
      this.screenContent = '';
      this.action = null;
      this.memory = 0;
      this.memoryLabel = false;
      this.memoryClean = false;
   }
}

// отрисовываем стейт в элементы screen и memLabel
function renderState() {
   screen.value = state.screenContent;
   if (state.memoryLabel) {
      memLabel.textContent = 'm';
   } else {
      memLabel.textContent = '';
   }   
}



// конкатенируем значения нажатой кнопки с текущим значением экрана в стейте,
// записываем и отрисовываем значения экрана в стейте
function numberHandler(value) {
   let newContent = `${state.screenContent}${value}`;
   if (!isNaN(+newContent)) {
      state.screenContent = newContent;
   }
   renderState();
}

// запускаем функцию расчета результата для предыдущего значения действия, если в стейте есть значение экрана
// записываем результат в значение экрана и отрисовываем,
// если действие что-то кроме =, то очищаем значение экрана
// запоминаем текущее значение действия
function actionHandler(value=null) {
   if (state.screenContent) {
      state.makeAction();
   }
   state.screenContent = state.currResult;
   renderState();
   if (value) {
      state.screenContent = '';
   }
   state.action = value;
}

// присваиваем стейту дефолтные значения, отрисовываем
function clearHandler() {
   state.clearState();
   renderState();
}


function memAddHandler() {
   state.memoryLabel = true;
   if (state.screenContent) {
      state.makeAction();
   }
   state.screenContent = state.currResult;
   state.memory += state.currResult;
   renderState();
   state.screenContent = '';
   state.currResult = 0;
   state.action = null;
}

function memRemHandler() {
   state.memoryLabel = true;
   if (state.screenContent) {
      state.makeAction();
   }
   state.screenContent = state.currResult;
   state.memory -= state.currResult;
   renderState();
   state.screenContent = '';
   state.currResult = 0;
   state.action = null;
}

function mrcHandler() {
   if (state.memoryClean) {  
      state.memoryClean = false; 
      state.memory = 0;
      state.memoryLabel = false;
      state.screenContent = ''
   } else {
      state.memoryClean = true;
      state.screenContent = state.memory;
   }
   renderState();
}


// вешаем обработчик клика на каждую кнопку из массива кнопок, 
// для каждого типа кнопки запускаем свою функцию в зависимости от совпадения с regexp
for(const button of buttons) {
   button.addEventListener('click', (event) => {
      let btnValue = event.target.value;

      if (btnValue.match(/\d|\./)) {
         numberHandler(btnValue);   
      }

      if (btnValue.match(/^\+|^-|\*|\//)) {
         actionHandler(btnValue);
      }

      if (btnValue.match(/=/)) {
         actionHandler();
      }

      if (btnValue.match(/C/)) {
         clearHandler();
      }

      if (btnValue.match(/m\+/)) {
         memAddHandler();
      }

      if (btnValue.match(/m-/)) {
         memRemHandler();
      }

      if (btnValue.match(/mrc/)) {
         mrcHandler();
      }
   });
}


// вешаем обработчик клавиатурных событий на документ,
// Enter: '=', Escape: 'C', Home: 'm+', End: 'm-', Insert: 'mrc'
document.addEventListener('keyup', (event) => {
   event.preventDefault();
   let keyValue = event.key;

   if (keyValue.match(/\d|\./)) {
      numberHandler(keyValue); 
   }

   if (keyValue.match(/^\+|^-|\*|\//)) {
      actionHandler(keyValue);
   }

   if (keyValue.match(/Enter/)) {
      actionHandler();
   }

   if (keyValue.match(/Escape/)) {
      clearHandler();
   }

   if (keyValue.match(/Home/)) {
      memAddHandler();
   }

   if (keyValue.match(/End/)) {
      memRemHandler();
   }

   if (keyValue.match(/Insert/)) {
      mrcHandler();
   }
});