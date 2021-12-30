const cont = document.querySelector(".wrapper");

function getStrFromArr(arr) {
   let str = '';
   for (const obj of arr) {
      let content = Object.values(obj)[0];
      str += content + ' ';
   }
   return str
}

function filmView(data) {
   let { posterUrl, 
         nameRu, 
         year, 
         genres, 
         shortDescription,

         description,
         slogan,
         countries,
         ratingAgeLimits,
         ratingFilmCritics,
         ratingGoodReview,
         ratingImdb,
         ratingKinopoisk,
         ratingMpaa,
   
      } = data; 

   let allGenres = getStrFromArr(genres)
   let allCountries = getStrFromArr(countries)

   const temp = `
   <a class='card-link'>
      <div class="popuptext">  
         <p class="popup-desc">         
            ${description}
         </p>  
         <blockquote class="popup-slogan">
            ${slogan ? slogan : ''}
         </blockquote>
         <p class="popup-countries">
            <b>Страны: </b><span>${allCountries}</span>            
         </p>        
         <p class="popup-agelim">
            <b>Возрастные ограничения: </b>
            ${ratingAgeLimits ? `<em>${ratingAgeLimits}</em>` : ''}
            ${ratingMpaa ? `<em>${ratingMpaa}</em>` : ''}
         </p>
         <div class="popup-ratings">
            <h4>Рейтинги</h4>
            <ul>
               <li>${ratingFilmCritics ? `<b>Критики: </b><span>${ratingFilmCritics}</span>` : ''}</li>
               <li>${ratingGoodReview ? `<b>GoodReview: </b><span>${ratingGoodReview}</span>` : ''}</li>
               <li>${ratingImdb ? `<b>Imdb: </b><span>${ratingImdb}</span>` : ''}</li>
               <li>${ratingKinopoisk ? `<b>Кинопоиск: </b><span>${ratingKinopoisk}</span>` : ''}</li>
            </ul>
         </div>
      </div>
      
      <div class="card">
         <div class="card-img">
            <img src="${posterUrl}" alt="">        
         </div>
         <h3 class="card-header">
            ${nameRu}
         </h3>
         <p class="card-genre">
            ${allGenres} 
         </p>
         <p class="card-year">
            ${year} 
         </p>
         <p class="card-text">            
            ${shortDescription ? shortDescription : description}
         </p>
      </div>
   </a>
   `;
   cont.insertAdjacentHTML("beforeend", temp);
}


cont.addEventListener('click', (e) => {
   const actionEl = e.target.closest('.card-link');
   // console.log(actionEl);
   if (actionEl) {
      actionEl.firstElementChild.classList.toggle('show');
   }
});


function filmById(id) {
   return fetch(
      `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`,
      {
         method: "GET",
         mode: 'cors',
         headers: {
            "X-API-KEY": "1bfe7e86-bff9-428c-b8eb-1947ea977797",
            "Content-Type": "application/json",
         },
      }
   );
}
   
   let promise = fetch(
      "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1",
      {
         method: "GET",
         headers: {
            "X-API-KEY": "1bfe7e86-bff9-428c-b8eb-1947ea977797",
            "Content-Type": "application/json",
         },
      }
   );
      
   promise
   .then((res) => res.json())
   .then((data) => {
      // console.log(data.films);

      // Фильмы нужно вытягивать по очереди, так как при частоте запросов более 1/60мс или количестве более 5 за раз появляются ошибки

      // Вариант с рекурсией
      let i = 0;
      let l = data.films.length;
      let rec = () => (
            filmById(data.films[i].filmId)
               .then((res) => res.json())
               .then((data) => {
                  // console.log(data);                    
                  filmView(data);    
                  i++;        
                  if (i < l) {
                     rec();
                  }
               }
         )
      );      
      rec();

      // // Вариант с асинхронной функцией (нужно дописать async у родителя)
      // for (const el of data.films) {
      //    let {filmId} = el;
      //    await filmById(filmId)
      //       .then((res) => res.json())
      //       .then((data) => {
      //          console.log(data);
      //          let {posterUrl, nameRu, ratingKinopoisk, year, genres, shortDescription} = data;                  
      //          filmView(posterUrl, nameRu, ratingKinopoisk, year, genres, shortDescription);
      //       });
      // }
   });



// // Тесты
// setInterval(() => {

// }, 500);

// for (let index = 0; index < 10; index++) {
//    let xhr = new XMLHttpRequest
//    xhr.onreadystatechange = function() {
//       if (xhr.readyState === 4) {
//          console.log(xhr)
//       }
//    }
//    xhr.onerror = (err) => {
//       console.log(err)
//    }
//    xhr.open('get', 'https://kinopoiskapiunofficial.tech/api/v2.2/films/522')
//    xhr.setRequestHeader("X-API-KEY", "1bfe7e86-bff9-428c-b8eb-1947ea977797")
//    xhr.send()
//    // filmById(522)
//    // .then((res) => {console.log(res); return res.json()})
//    // .then((data) => {
//    //    console.log(data);
//    // }).catch((err) => console.dir(err));
// }