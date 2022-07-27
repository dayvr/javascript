import {MyApp} from "./modules/app.js";

let toDoList = [];

let myApp = new MyApp(toDoList);

myApp.init();
myApp.render();
