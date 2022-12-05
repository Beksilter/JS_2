export const ProductItem = {
    props: ['img', 'product'],
    template:
        `
            <div class="product-item">
                <img :src="img" :alt="product.product_name">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}р.</p>
                    <button class="btn-cart" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div>
            </div>
        `
};