const BASE_URL = `https://restcountries.com/v3.1/`;
const ENDPOINT = `name/`;

export function fetchCountries(name) {
  return fetch(
    `${BASE_URL}${ENDPOINT}${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error('Оооошиииибббкааа');
    }
    return response.json();
  });
}
