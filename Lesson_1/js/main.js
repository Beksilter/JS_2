'use strict';

const products = [
    {id: 1, title: 'Dish_1', price: 150},
    {id: 2, title: 'Dish_2', price: 200},
    {id: 3, title: 'Dish_3', price: 370},
    {id: 4, title: 'Dish_4', price: 465},
    {id: 4, title: 'Dish_5', price: 620},
];

const renderProduct = (item, img = 'https://i.pinimg.com/originals/19/de/db/19dedb68d2f6eb0a57c0d2e598a4575b.gif') =>
        `<div class="product">
          <img src="${img}" alt="productImg">
          <h3>${item.title}</h3>
          <p>${item.price} руб.</p>
          <button class="buy-button">Купить</button>
        </div>`;

const renderProducts = list => {document.querySelector('.products')
        .insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
};

renderProducts(products);


/*
 Для того, чтобы не отображались запятые, необходимо использовать Join

*/