// Day Vazquez <dayvazquez@uoc.edu>

import {currenciesList} from "../main.js";
import {HasOverlay} from "./has-overlay.js";

export class CurrencydetailShow {
    static LIST_HEADER = `<li class="currencylist__item currencylist__item--header">
                        <span class="currencylist__item-code">Code</span>
                        <span class="currencylist__item-name">Name</span>
                        <span class="currencylist__item-actions"> </span>
                    </li>`;

    static SELECTED = `<span class="icon link__icon">
                                    <img src="img/ico-fav-selected-outline.svg" alt="Add to favs">
                                    </span>`;

    static NOT_FAV = `<span class="icon link__icon">
                                        <img src="img/ico-fav-outline.svg" alt="Add to favs">
                                        </span>`;

    static allCookies = document.cookie.split(';').reduce((cookies, cookie) => {
        const [name, val] = cookie.split('=').map(c => c.trim());
        cookies[name] = val;
        return cookies;
    }, {});

    static resultsTitle = document.getElementsByClassName('js-results-title');

    static search = document.getElementsByClassName('js-search-input');

    showTitle() {
        CurrencydetailShow.resultsTitle = document.getElementsByClassName('js-results-title');
        CurrencydetailShow.resultsTitle[0].innerHTML = 'Available Currencies';
    }

    // List all available currencies
    render(currencies) {
        let ul = document.getElementsByClassName('js-currencylist');
        ul[0].replaceChildren();
        ul[0].insertAdjacentHTML('afterbegin', CurrencydetailShow.LIST_HEADER);
        for (const elem in currencies) {
            let currencyCode = elem.toUpperCase();
            let li = `<li class="currencylist__item js-currency-item" data-code="">
                        <span class="currencylist__item-code">${currencyCode}</span>
                        <span class="currencylist__item-name">
                            <a href="#" class="link">${currencies[elem]}</a>
                        </span>
                        <span class="currencylist__item-actions">
                            <a class="link js-item-fav" href="#" data-code="">
                            ${(currencyCode in CurrencydetailShow.allCookies) ? CurrencydetailShow.SELECTED : CurrencydetailShow.NOT_FAV}
                            </a>
                        </span>
                    </li>`;
            ul[0].innerHTML += li;
        }
        this.favSelect();
        HasOverlay.setOverlay();
        HasOverlay.overlayClose();
    }

    static addCookie(currKey) {
        document.cookie = `${currKey[0]}=${currKey[1]}; domain=localhost; max-age=86400; path=/;`;
        CurrencydetailShow.allCookies[currKey[0]] = currKey[1];
    }

    static delCookie(currKey) {
        document.cookie = `${currKey[0]}` + '=; domain=localhost; max-age=-1; path=/;';
        delete CurrencydetailShow.allCookies[currKey[0]];
    }

    // Check if fav in cookies
    static checkCookieForCurrency(currKey) {
        let cookies = CurrencydetailShow.allCookies;
        let exists = (Object.keys(cookies).indexOf(currKey[0]) > -1) ? true : false;
        return exists;
    }

    // Select favourite currencies
    favSelect() {
        let fav = document.getElementsByClassName("js-item-fav");
        const favSelected = function (elem, className) {
            while ((elem = elem.parentElement) && !elem.classList.contains(className)) {
                return elem.parentElement.innerText;
            }
        }
        for (let i = 0; i < fav.length; i++) {
            let favCurrency = favSelected(fav[i], 'js-currency-item');
            let currKey = favCurrency.split(/\r?\n/);
            fav[i].selected = CurrencydetailShow.checkCookieForCurrency(currKey);

            fav[i].addEventListener('click', function (e) {
                e.preventDefault();
                if (!fav[i].selected) {
                    // Show as favorite currency
                    fav[i].innerHTML = CurrencydetailShow.SELECTED;
                    fav[i].selected = true;
                    CurrencydetailShow.addCookie(currKey);
                } else {
                    // Remove favorite currency
                    fav[i].innerHTML = CurrencydetailShow.NOT_FAV;
                    fav[i].selected = false;
                    CurrencydetailShow.delCookie(currKey);
                    let currencyShow = new CurrencydetailShow();
                    currencyShow.render(CurrencydetailShow.allCookies);
                }
            });
        }
    }

    // Render favorite currencies
    favoritesShow() {
        const favsButton = document.getElementsByClassName('js-favs');
        const clearSearchBtn = document.getElementsByClassName('js-clear-btn');
        // Exit from favourite view using the "Clear search" button
        const clearingFavs = () => {
            CurrencydetailShow.search[0].value = "";
            this.showTitle();
            this.render(currenciesList);
        }
    // View the user's favourite list
        const clickingFavs = () => {
            CurrencydetailShow.resultsTitle[0].innerHTML = 'Favourites list';
            if (CurrencydetailShow.allCookies.hasOwnProperty("")) {
                CurrencydetailShow.resultsTitle[0].innerHTML = 'No Favorites';
                this.render({});
            } else {
                this.render(CurrencydetailShow.allCookies);
            }
        }
        favsButton[0].addEventListener('click', clickingFavs);
        clearSearchBtn[0].addEventListener('click', clearingFavs);
    }

    // Filter the currencies by a code/name
    searchCurrencies() {
        const clear = document.getElementsByClassName('js-clear-btn');
        const feedback = document.getElementsByClassName('js-search-feedback');
        let searchResult = '';

        const cleared = () => {
          this.render(currenciesList);
        }

        CurrencydetailShow.search[0].addEventListener('input', (event) => {
            searchResult = event.target.value.toLowerCase();
            const searchList = () => {
                const asArray = Object.entries(currenciesList);
                const filtered = asArray.filter(([key, value]) => {
                    return (key.toLowerCase().includes(searchResult) || value.toLowerCase().includes(searchResult));
                });
                let filteredObj = Object.fromEntries(filtered);
                this.render(filteredObj);
            }
            if(searchResult.length >= 3) {
                CurrencydetailShow.resultsTitle[0].innerHTML = `Currencies with: ${searchResult.substring(0,3)}`;
                searchList();
            }
            let liElems = document.querySelector('ul').children.length;
            if(searchResult.length >= 3 && liElems == 1) {
                CurrencydetailShow.resultsTitle[0].innerHTML = 'No currencies found';
            }
            if(searchResult.length === 3) {
                feedback[0].innerHTML = '';
            } else {
                if(searchResult.length === 0) {
                    feedback[0].innerHTML = '';
                    CurrencydetailShow.resultsTitle[0].innerHTML = 'Available currencies';
                    this.render(currenciesList);
                } else {
                    feedback[0].innerHTML = 'Search length should be at least 3 chars length.';
                }
            }
        });
        clear[0].addEventListener('click', cleared);
    }
}
