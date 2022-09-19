'use strict';

class Menu {
    constructor() {
        this.menu = this.fetchMenu();
        this.size = this.menu.size;
        this.extras = this.menu.extras;
        this.topping = this.menu.topping;
        this.render();
    }

    /**
     * Метод делает xhr запрос списка ингредиентов.
     * @return {{Object}} ingredients объект со списком ингредиентов
     */
    fetchMenu() {

        return {
            size: [
                {"id": "S", "price": 300, "calorie": 150, "text": "Стандартный (300 Руб., 150 калорий)"},
                {"id": "L", "price": 500, "calorie": 300, "text": "Большой (500 Руб., 300 калорий)"}
            ],
            extras: [
                {"id": "1", "price": 20, "calorie": 30, "text": "Сыр (+20 Руб., +30 калорий)"},
                {"id": "2", "price": 20, "calorie": 5, "text": "Салат (+20 Руб., +5 калорий)"},
                {"id": "3", "price": 45, "calorie": 50, "text": "Картофель фри (+45 Руб., +50 калорий)"}
            ],
            topping: [
                {"id": "1", "price": 15, "calorie": 0, "text": "Приправа (+15 Руб., +0 калорий)"},
                {"id": "2", "price": 20, "calorie": 15, "text": "Майонез (+20 Руб., +15 калорий)"}
            ]
        }
    }
    /**
     * Выводим список ингредиентов на экран
     */
    render() {
        document.getElementById('size').insertAdjacentHTML("afterbegin", this._createHTML(this.size, "option"));
        document.getElementById('extras').insertAdjacentHTML("afterbegin", this._createHTML(this.extras, "option"));
        document.getElementById('topping').insertAdjacentHTML("afterbegin", this._createHTML(this.topping, "checkbox"));
    }

    _createHTML(section, tag = 'option') {
        switch (tag) {
            case "option":
                return section.map(item => `<option value="${item.id}">${item.text}</option>`).join('');
            case "checkbox":
                return section.map(item => `<input type="checkbox" name="topping" value="${item.id}" id="topping${item.id}">
                    <label for="topping${item.id}"> ${item.text}</label><br>`).join('');
        }
    }
}

class Burger {
    constructor(menu) {
        this.menu = menu;
        this.size = menu.size[0];
        this.extras = menu.extras[0];
        this.toppings = [];
        this.calculatePrice();
        this.calculateCalories();
    }

    changeIngredient(target) {
        let index = this.menu[target.name].findIndex(x => x.id === target.value);
        let ingredient = this.menu[target.name][index];

        switch (target.name) {
            case "size":
                this.size = ingredient;
                break;
            case "extras":
                this.extras = ingredient;
                break;
            case "topping":
                if (target.checked === true) {
                    this.addTopping(ingredient);
                } else {
                    this.removeTopping(ingredient);
                }
                break;
        }
        this.calculatePrice();
        this.calculateCalories();
    }

    addTopping(topping) {
            this.toppings.push(topping);
    }

    removeTopping(topping) {
            this.toppings.splice(this.toppings.indexOf(topping), 1);
    }

    calculatePrice() {
        let price = this.size.price + this.extras.price;
        this.toppings.forEach(item => price += item.price);
        document.querySelector('.price').innerText = price + " RUB";
    }

    calculateCalories() {
        let calorie = this.size.calorie + this.extras.calorie;
        this.toppings.forEach(item => calorie += item.calorie);
        document.querySelector('.calorie').innerText = calorie + " kCal";
    }
}

const menu = new Menu();
const burger = new Burger(menu);
document.querySelector('#form').addEventListener('change', (event) => burger.changeIngredient(event.target));