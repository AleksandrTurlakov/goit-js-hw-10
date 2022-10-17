import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import markup from './js/templates/markup.hbs';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  const name = evt.target.value.trim();
  console.log(evt.target.value);
  fetchCountries(name)
    .then(showCountries)
    .catch(err => console.log('Ошибка какой кошмар'));
}

function showCountries(data) {
  console.log(markup(data));
}
