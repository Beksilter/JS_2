import {CartItem} from "./CartItem.js";

export const Cart = {
    inject: ['API', 'getJson'],
    components: {
        CartItem
    },
    data() {
      return {
          showCart: false,
          cartUrl: '/getBasket.json',
          imgCart: 'https://via.placeholder.com/50x100',
          cartItems: [],
      }
    },
    methods: {
        addProduct(product) {
            this.getJson(`${this.API}/addToBasket.json`)
                .then(data => {
                    if(data.result){
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod);
                        }
                    }
                })
        },
        remove(product){
            this.getJson(`${this.API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result){
                        if(product.quantity > 1){
                            product.quantity--
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1)
                        }
                    }
                })
        },
    },
    mounted() {
        this.getJson(`${this.API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
                <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
                <div class="cart-block" v-show="showCart">
                    <p v-if="!cartItems.length">Корзина пуста</p>
                    <CartItem 
                    v-for="item of cartItems" 
                    :key="item.id_product"
                    :img="imgCart"
                    :cartItem="item"
                    @remove="remove"
                    ></CartItem>
                </div>
    `
};