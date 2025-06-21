import { createStore } from 'vuex'
const carts = window.localStorage.getItem('carts');
const store = createStore({
    state: {
        preloader: false,
        carts: carts ? JSON.parse(carts) : [],
    },
    getters: {

    },
    mutations: {
        loader(state, playload) {
            state.preloader = playload
        },
        addCart(state, item) {
            const found = state.carts.find(product => product.img == item.img);
            if (found) {
                found.count++
            } else {
                this.state.carts.push(item);
            }
            this.commit('saveLocalSotre');
        },
        saveLocalSotre() {
            window.localStorage.setItem('carts', JSON.stringify(this.state.carts))
        },
        removeItem(state, item) {
            let carts = state.carts.indexOf(item);
            state.carts.splice(item, 1);
            this.commit('saveLocalSotre');
        }
    },
    actions: {

    },
    modules: {

    }
})

export default store;