const App = {
    data() {
        return {
            API: `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`,
            userSearch: '',
            showCart: false,
            cartUrl: '/getBasket.json',
            imgCart: 'https://via.placeholder.com/50x100',
            cartItems: [],
            catalogUrl: '/catalogData.json',
            products: [],
            imgCatalog: 'https://via.placeholder.com/200x150',
            totalSum: 0
        }
    },
    computed: {
        filtered() {
            return this.products.filter(el => new RegExp(this.userSearch, 'i').test(el.product_name));
        },
        totalCost() {
            let sum = 0
            for (let i in this.cartItems.length) {
                sum += this.cartItems[i].price
            }
            this.totalSum = sum
        }
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
        },
        addProduct(product) {
            this.getJson(`${this.API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod);
                        }
                    }
                })
        },
        remove(product) {
            this.getJson(`${this.API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        if (product.quantity > 1) {
                            product.quantity--
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1)
                        }
                    }
                })
        }
    },
    mounted() {
        this.getJson(`${this.API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
        this.getJson(`${this.API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            })
    }
};

Vue.createApp(App).mount('#app');