import {List} from "./list.js";

export class MyApp {
    constructor(ref, itemList) {
        this.list = new List(ref, itemList);
    }

    init() {
        this.list.remove();
    }

    render() {
        this.list.render();
        this.list.deleteOnClick();
        this.list.setAsDone();
    }

}