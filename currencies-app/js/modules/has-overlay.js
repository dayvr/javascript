// Day Vazquez <dayvazquez@uoc.edu>

import {CurrencydetailShow} from "./currencydetail-show.js";
import {currenciesList} from "../main.js";
export class HasOverlay {

    static articleElem = document.getElementsByClassName('currencydetail');
    static bodyElem = document.querySelector('body');
    static listTitle = document.getElementsByClassName('currencydetail__subtitle');
    static code = document.getElementsByClassName('js-currencydetail-code');
    static cName = document.getElementsByClassName('js-currencydetail-name');
    static sDate = document.getElementsByClassName('js-currencydetail-date');
    static favIcon = document.getElementsByClassName('js-currencydetail-fav-icon');
    static fav = document.getElementsByClassName('link__label js-currencydetail-fav-label');

    // Show a currency detailed exchange information when clicking on it
    static setOverlay() {
        const elems = document.getElementsByClassName('link');
        let filtered = [];

        for(let i = 0; i < elems.length; i++) {
            if (elems[i].className != "link link--favs js-favs" &&
                elems[i].className != "link js-item-fav" &&
                elems[i].className != "currencydetail__addfav link js-currencydetail-fav") {
                filtered.push(elems[i]);
            }
        }
        const clickName = (event) => {
            let found_key = "";
            let found_value;
            for (let key in currenciesList) {
                if (currenciesList[key] === event.currentTarget.innerText) {
                    found_key = key;
                    found_value = currenciesList[key];
                    break;
                }
            }
            HasOverlay.bodyElem.classList.add('has-overlay');
            HasOverlay.articleElem[0].classList.add('currencydetail--show');
            HasOverlay.code[0].innerHTML = String(found_key).toUpperCase();
            HasOverlay.cName[0].innerHTML = found_value;
            HasOverlay.listTitle[0].innerHTML = 'Exchange List';
            HasOverlay.renderSelected(found_key);
            HasOverlay.addToFavs(found_key);

            let favCurr = [found_key.toUpperCase(), found_value];
            let found = CurrencydetailShow.checkCookieForCurrency(favCurr);
            if (found) {
                HasOverlay.fav[0].innerHTML = 'Remove fav';
                HasOverlay.favIcon[0].src = "img/ico-fav-selected-outline.svg";
            } else {
                HasOverlay.fav[0].innerHTML = 'Add to favs';
                HasOverlay.favIcon[0].src = "img/ico-fav-outline.svg";
            }
        }
        for (let i = 0; i < filtered.length; i++) {
            filtered[i].addEventListener('click', clickName);
        }
    }

    // Close detailed view
    static overlayClose() {
        let url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json';
        const fetching = (url) => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    let currencyShow = new CurrencydetailShow();
                    currencyShow.render(data);
                });
        }
        const close = document.getElementsByClassName('js-currencydetail-close');
        close[0].addEventListener('click', (e) => {
            e.preventDefault();
            HasOverlay.bodyElem.classList.remove('has-overlay');
            HasOverlay.articleElem[0].classList.remove('currencydetail--show');
            fetching(url);
        })
    }

    // Add/remove selected currency to user favorites
    static addToFavs(currCode) {
        let found = false;
        const select = () => {
            let favCurr = [currCode.toUpperCase(), currenciesList[currCode]];
            found = CurrencydetailShow.checkCookieForCurrency(favCurr);
            if (found) {
                HasOverlay.fav[0].innerHTML = 'Add to favs';
                HasOverlay.favIcon[0].src = "img/ico-fav-outline.svg";
                CurrencydetailShow.delCookie(favCurr);
            } else {
                HasOverlay.fav[0].innerHTML = 'Remove fav';
                HasOverlay.favIcon[0].src = "img/ico-fav-selected-outline.svg";
                CurrencydetailShow.addCookie(favCurr);
            }
        }
        if (HasOverlay.fav[0].getAttribute('listener') !== 'true') {
            HasOverlay.fav[0].addEventListener('click', select);
            HasOverlay.fav[0].setAttribute('listener', 'true');
        }
    }

    // Show full exchange list for the selected currency
    static renderSelected(elem) {
        let latest = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/'+`${elem}`+'.json';
        const fetching = (url) => {
            fetch(url)
                .then(response => response.json())
                .then(data => toPrint(data));
        }
        fetching(latest);

        const toPrint = (data) => {
            let list = Object.entries(data);
            let nList;
            for(let i = 1; i < list.length; i++) {
              for(let j = 0; j < list[i].length; j++) {
                  nList = list[i][j];
              }
          }
            let section = document.getElementsByClassName('js-currencydetail-list');
            section[0].replaceChildren();
            for(let key in nList) {
                let div = `<div class="currencydetail__datasheet-row">
                    <h3 class="currencydetail__datasheet-label">${String(key).toUpperCase()}</h3>
                    <p class="currencydetail__datasheet-data">${nList[key]}</p>
                </div>`;
                section[0].innerHTML += div;
            }

            // Change the date using input date and render the new information.
            HasOverlay.sDate[0].setAttribute('min', '2020-11-22'); // Disallow dates prior to this date
            let dateResult = '';
            HasOverlay.sDate[0].addEventListener('input', (event) => {
                dateResult = event.target.value;
                let dated = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/'+`${dateResult}`+'/currencies/'+`${elem}`+'.json';
                fetching(dated);
                toPrint(data);
            })
        }
    }
}