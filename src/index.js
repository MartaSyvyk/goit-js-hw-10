import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;
// const url = https://restcountries.com/v2/{name}?fields=name,flags,capital,lang
const refs = {
    inputEl: document.querySelector('#search-box'),
    listEl: document.querySelector('.country-list')
}

// refs.inputEl.addEventListener('input', debounce(() => {onSearch}, DEBOUNCE_DELAY))



  
// function onSearch(event){
//    let searchResult = event.currentTarget.value;
//    function fetchCountries(name) { 
    
//     return fetch(`https://restcountries.com/v2/name/${name}`).then(
//       (response) => {
       
//         return response.json();
//       }
//     )
//   }
// fetchCountries(searchResult).then(renderMarkup).catch(onError); 
// }

  function renderMarkup(countries) {
        if (countries.length > 10){
          refs.listEl.innerHTML =  "";
        return Notify.info('Too many matches found. Please enter a more specific name.');
      }
      else if (countries.length >= 2 && countries.length <= 10){
    
  const listMarkup = countries.map((country) => {
           return  `<li>
           <img src=${country.flags.svg} width=50px>
            <p> ${country.name.official}</p>
        </li>`;
         ;
      })
      .join("");
      refs.listEl.innerHTML =  listMarkup;
      }
      else if (countries.length = 1){
        const singleMarkup = countries.map((country) => {
          const languagesMarkupArray = Object.values(country.languages).map((language) => {return `<li>${language}</li>`}).join("");
          return  `<li>
        <img src=${country.flags.svg} width=300px>
        <p> ${country.name.official}</p>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Languages: <ul> 
       ${languagesMarkupArray}</ul>
        
      </p>
    </li>`;
   
  })
  .join("");
  refs.listEl.innerHTML = singleMarkup;
      
  }
  }
  function onError() {
    Notify.failure('Oops, there is no country with that name');
  }



  function fetchCountries(name) { 
    
        return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,flags,capital,languages,population`).then(
          (response) => {
           
            return response.json();
          }
        )
      }
    // fetchCountries('Switzerland').then(result => {renderMarkup(result) }).catch(error => console.log(error));


    function onSearch(event){
   let searchResult = event.target.value.trim();
   if (searchResult == ""){
    return
   }
   fetchCountries(searchResult).then(result => renderMarkup(result)).catch(onError);
   
}
refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))