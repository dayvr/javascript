
export class List {
    IS_DONE = '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m16.5 8.25-6.3 7.5-2.7-3" stroke="#94D24C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.75 3H5.25A2.25 2.25 0 0 0 3 5.25v13.5A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V5.25A2.25 2.25 0 0 0 18.75 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>\n';
    NOT_DONE = '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m16.5 8.25-6.3 7.5-2.7-3" stroke="#94D24C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.75 3H5.25A2.25 2.25 0 0 0 3 5.25v13.5A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V5.25A2.25 2.25 0 0 0 18.75 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>\n';

    constructor(list) {
        this.listDom = list;
    };

    remove() {
        let elemsToRemove = document.getElementsByClassName('item');

        while (elemsToRemove.length) {
            elemsToRemove[0].remove();
        }
    }


    render() {
        const ol = document.querySelector('.js-list');
        // const ol = document.getElementsByClassName(this.domRef.className);
        for(let i = 0; i < this.listDom.length; i++) {

            const li = document.createElement('li');
            const a = document.createElement('a');
            const spanElement = document.createElement('span');
            const a2 = document.createElement('a');

            li.className = "item";
            li.appendChild(a);
            li.appendChild(spanElement);
            li.appendChild(a2);

            a.className = "item-status";
            a.setAttribute("href", "#");
            a.innerHTML = '<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.75 3H5.25A2.25 2.25 0 0 0 3 5.25v13.5A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V5.25A2.25 2.25 0 0 0 18.75 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>\n'

            spanElement.className = "item-name";
            spanElement.innerHTML = this.listDom[i].name;

            a2.className = "item-delete";
            a2.setAttribute("href", "#");
            a2.innerHTML = '<svg class="ico-delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Trash</title><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>\n';

            ol[0].appendChild(li);
        }
    }

    // Create a to-do object and push it to the list
    addItem(itemName) {
        const item = {
            itemName,
            done: false,
        };

        this.listDom.push(item);
        console.log(this.listDom);
    }


    setAsDone() {
        let items = document.getElementsByClassName("item-status");
        for(let i = 0; i < items.length; i++) {
            if(this.listDom[i].done === true) {
                items[i].innerHTML = this.IS_DONE;
            } else {
                const toDo = () => {
                    items[i].innerHTML = this.NOT_DONE;
                }
                items[i].addEventListener('click', toDo);
            }
        }
    }

    deleteOnClick() {
        let toDelete = document.getElementsByClassName("item-delete");
        for (let i = 0; i < toDelete.length; i++) {
            toDelete[i].onclick = function() {
                let div = this.parentElement;
                div.style.display = "none";
            }
        }
    }

    // toggle() {
    //     let input = document.getElementById("input");
    //     let hidden = input.getAttribute("hidden");
    //
    //     if (hidden) {
    //         input.removeAttribute("hidden");
    //     } else {
    //         input.setAttribute("hidden", "hidden");
    //     }
    // }

}
