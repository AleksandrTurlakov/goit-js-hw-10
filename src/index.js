import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import markupCountry from './js/templates/markupCountry.hbs';
import markupCountries from './js/templates/markupCountries.hbs';

const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const searchBox = document.querySelector('#search-box');
searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const name = evt.target.value.trim();
  console.log(evt.target.value);
  fetchCountries(name)
    .then(showCountry)
    .catch(Error => {
      Notify.failure('Oops, there is no country with that name');
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    });
}

function showCountry(data) {
  if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  } else if (data.length >= 2 && data.length <= 10) {
    countryList.innerHTML = '';
    countryList.insertAdjacentHTML('afterbegin', markupCountries(data));
    countryInfo.innerHTML = '';
  } else if (data.length === 1) {
    countryInfo.innerHTML = '';
    countryInfo.insertAdjacentHTML('afterbegin', markupCountry(data));
    countryList.innerHTML = '';
  }
}
