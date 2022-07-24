import {MyApp} from "./modules/app.js";

let app = new MyApp(document.querySelector('.js-list'), [
    {
        done: false,
        name: 'One',
    }, {
        done: true,
        name: 'Two',
    }, {
        done: true,
        name: 'Three',
    }, {
        done: false,
        name: 'Four',
    }
]);


app.init();
app.render();
console.log("Test");