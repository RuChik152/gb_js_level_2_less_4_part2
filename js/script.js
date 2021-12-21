"use strict";

/**
 * Клас отвечающий за инициализацию и нахначающий обработчик
 */
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
                if (input.state == false) {
                    e.preventDefault();
                }
            }
        }

    }
}

/**
 * Класс отвечающий за маршрутизацию, в него передаються данные из класса Form и на основе них он принимает решение какой класс првоерки создавать.
 */
class CheckRoute {
    constructor(input) {
        this.input = input;
        this.state = null
        this._init();
    }

    _init() {
        
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

/**
 * Родительский класс для проверки 
 */
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


/**
 * Класс проверяет на основе заложенных данных то что ввел пользователь в поле для имени, если введены данне соотвесвуют, то возвращает true, если нет, то false
 */
class CheckName extends Check {
    constructor(object, state, parent = '') {
        super(object, state, parent);
        this._init();
    }
    _init() {
        
        let style = new Style(this.object);
        let check = this.object.value.search(/^[a-zа-яA-ZА-ЯёЁ0-9_-]{4,10}$/g)
        if (check == -1) {
            style.addFail();
            this.state = false;
            return this.state;
        } else {
            style.removeFail();
            this.state = true;
            return this.state;
        }


    }
}

/**
 * Класс проверяет на основе заложенных данных то что ввел пользователь в поле для телефона, если введены данне соотвесвуют, то возвращает true, если нет, то false
 */
class CheckNumber extends Check {
    constructor(object, state, parent = '') {
        super(object, state, parent);
        this._init();
    }

    _init() {
        
        let style = new Style(this.object);
        let check = this.object.value.search(/^\+7[0-9]{10}$/g)
        if (check == -1) {

            style.addFail();
            this.state = false;
            return this.state;
        } else {
            style.removeFail();
            this.state = true;
            return this.state;
        }
    }

}

/**
 * Класс проверяет на основе заложенных данных то что ввел пользователь в поле для E-MAIL, если введены данне соотвесвуют, то возвращает true, если нет, то false
 */
class CheckEmail extends Check {
    constructor(object, state, parent = '') {
        super(object, state, parent);
        this._init();
    }

    _init() {
        
        let style = new Style(this.object);
        let check = this.object.value.search(/^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-z]{2,4}$/g)
        if (check == -1) {
            style.addFail();
            this.state = false;
            return this.state;
        } else {
            style.removeFail();
            this.state = true;
            return this.state;
        }
    }
}

/**
 * Класс назначет или убирает селектор fail с блока, так же инициализирует класс Mass
 */
class Style extends Check {
    constructor(object){
        super(object);

    }

    _init(){
        console.log(this.object);
    }

    addFail(){
        let a = new Mass(this.object);
        a.errorAdd();
        this.object.classList.add('fail');
    }
    removeFail(){
        let a = new Mass(this.object);
        a.errorRemove();
        this.object.classList.remove('fail');
    }
}


/**
 * Класс для генерации и вставки в разметку страницы сообщений если произошла ошибка, так же для удаления сообщений об ошибки если поблема устранена.
 */
class Mass {
    constructor(obj, container = '.error__box'){
        this.obj = obj;
        this.div = container;
    }

    errorAdd(){

        let div = document.querySelector(this.div);
        let a = `.error__${this.obj.name}`
        let link = document.querySelector(a);


        console.log(this.obj.dataset.info);
        if(!div.contains(link)){
            let str =  `<div class="error__${this.obj.name}"">
                            <p> ОШИБКА в поле ${this.obj.placeholder} ${this.obj.dataset.info}</p>
                        </div>`;

            div.insertAdjacentHTML('afterbegin', str);
        } 

    }

    errorRemove(){
        let div = document.querySelector(this.div);
        let a = `.error__${this.obj.name}`
        let link = document.querySelector(a);

        
        if(div.contains(link)){
            link.remove();
        }  
    }
}


new Form();