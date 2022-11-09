import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import API from './js/api';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  listEl: document.querySelector('.country-list'),
};

function renderMarkup(countries) {
  if (countries.length > 10) {
    refs.listEl.innerHTML = '';
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length >= 2 && countries.length <= 10) {
    const listMarkup = countries
      .map(country => {
        return `<li class="country-header--small">
           <img class="flag-img" src=${country.flags.svg} width=40px>
            <p class="country-name-in-list"> ${country.name.official}</p>
        </li>`;
      })
      .join('');
    refs.listEl.innerHTML = listMarkup;
  } else if ((countries.length = 1)) {
    const singleMarkup = countries
      .map(country => {
        const languagesMarkupArray = Object.values(country.languages).join(
          ', '
        );

        return `<li class="country-header">
        <img class="flag-img" src=${country.flags.svg} width=50px height=50px>
         <p class="country-name"> ${country.name.official}</p></li>
        <p><span class="country-values-keys">Capital:</span> ${country.capital}</p>
        <p><span class="country-values-keys">Population:</span> ${country.population}</p>
        <p><span class="country-values-keys">Languages:</span> 
       ${languagesMarkupArray}
        
      </p>
    `;
      })
      .join('');
    refs.listEl.innerHTML = singleMarkup;
  }
}
function onError() {
  Notify.failure('Oops, there is no country with that name');
}

function onSearch(event) {
  let searchResult = event.target.value.trim();
  if (searchResult == '') {
    refs.listEl.innerHTML = '';
    return;
  }
  API.fetchCountries(searchResult)
    .then(result => renderMarkup(result))
    .catch(onError);
}
refs.inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
