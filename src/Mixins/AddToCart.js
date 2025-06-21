export default {
    methods: {
        addToCart(item) {
            let cart = {
                title: item.title,
                price: item.price,
                img: item.image.url,
                count: 1,
            }
            this.$store.commit('addCart', cart);
        }
    },
}