// Day Vazquez <dayvazquez@uoc.edu>

import {CurrencydetailShow} from "./modules/currencydetail-show.js";

const url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json';
async function fetchCurrencies(url) {
    const response = await fetch(url);
    return await response.json();
}

export const currenciesList = await fetchCurrencies(url);
let currencyShow = new CurrencydetailShow();
currencyShow.render(currenciesList);
currencyShow.showTitle();
currencyShow.favoritesShow();
currencyShow.searchCurrencies();
