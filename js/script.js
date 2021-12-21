"use strict";

class Form {
    constructor(container = '.form') {
        this.container = container;
        this._init();
    }

    _init() {
        document.querySelector(this.container).addEventListener('submit', this.check);
    }

    check(e) {
        console.log(e.currentTarget);
        for (let item of e.currentTarget) {
            if (item.nodeName == 'INPUT') {

                let input = new CheckRoute(item);
                // console.log(input);
                // console.log(input.state);
                if (input.state == false) {
                    e.preventDefault();
                }
            }
        }

    }
}


class CheckRoute {
    constructor(input) {
        this.input = input;
        this.state = null
        this._init();
    }

    _init() {
        //console.log(this.input.name);
        if (this.input.name == 'name') {
            let check = new CheckName(this.input);
            this.state = check.state;
            return check;
        }
        if (this.input.name == 'number') {
            let check = new CheckNumber(this.input);
            this.state = check.state;
            return check;
        }
        if (this.input.name == 'email') {
            let check = new CheckEmail(this.input);
            this.state = check.state;
            return check;
        }

    }
}

class Check {
    constructor(object, pattern = '') {
        this.object = object;
        this.pattern = pattern;
        this.state = null;
    }

    _init() {
        return false;
    }
}

class CheckName extends Check {
    constructor(object, state, parent = '') {
        super(object, state, parent);
        this._init();
    }
    _init() {
        //console.log(this.object.value);
        //let style = new Style(this.object);
        let check = this.object.value.search(/^[a-zа-яA-ZА-ЯёЁ0-9_-]{4,10}$/g)
        if (check == -1) {
            //let error = new Massege(this.object);
            //style.addFail();
            this.state = false;
            return this.state;
        } else {
            //style.removeFail();
            this.state = true;
            return this.state;
        }


    }
}

class CheckNumber extends Check {
    constructor(object, state, parent = '') {
        super(object, state, parent);
        this._init();
    }

    _init() {
        //console.log(this.object.value);
        //let style = new Style(this.object);
        let check = this.object.value.search(/^\+7[0-9]{10}$/g)
        if (check == -1) {
            //let error = new Massege(this.object);
            //style.addFail();
            this.state = false;
            return this.state;
        } else {
            //style.removeFail();
            this.state = true;
            return this.state;
        }
    }

}

class CheckEmail extends Check {
    constructor(object, state, parent = '') {
        super(object, state, parent);
        this._init();
    }

    _init() {
        //console.log(this.object.value);
        //let style = new Style(this.object);
        let check = this.object.value.search(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-z]{2,4}$/g)
        if (check == -1) {
            //let error = new Massege(this.object);
            //style.addFail();
            this.state = false;
            return this.state;
        } else {
            //style.removeFail();
            this.state = true;
            return this.state;
        }
    }
}


class Style extends Check {
    constructor(object){
        super(object);
        this._init();
    }

    _init(){
        console.log(this.object);
    }

    addFail(){
        this.object.classList.add('fail');
    }
    removeFail(){
        this.object.classList.remove('fail');
    }
}

// class Massege extends Check {
//     constructor(object) {
//         super(object);
//         this._init();
//         this.str = ''
//     }

//     _init() {
//         console.log(this.object);
//         this.record();
//         console.log(this.str);

//     }

//     record() {

//         if (this.object.name == 'name') {
//             this.str = `<div class="error">
//                             <p>У вас в поле ${this.object.placeholder} ошибка.</p>
//                             <span>Возможны буквы латинские или кирилица, без цифр, одно слово без пробелов</span>
//                         </div>`;
//         }
        
//         if (this.object.name == 'number') {
//             this.str = `<div class="error">
//                             <p>У вас в поле ${this.object.placeholder} ошибка.</p>
//                             <span>Телефон должен выглядет так +79101277250 </span>
//                         </div>`;
//         }

//         if (this.object.name == 'email') {
//             this.str = `<div class="error">
//                             <p>У вас в поле ${this.object.placeholder} ошибка.</p>
//                             <span>Email должен выглядет так name@name.name</span>
//                         </div>`;
//         }

//         this.render();

//     }

//     render(){
        
//         console.log(this.object.parentNode);
//         let errorBox = document.querySelector('.error__box')
//         errorBox.insertAdjacentHTML('afterbegin', this.str);
//     }

// }

new Form();