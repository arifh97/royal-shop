<template>
    <div>
        <Header />
        <div class="container">
            <button @click="increment()">+</button>
            <span>{{ count }}</span>
            <button @click="decrement()">-</button>
        </div>
        <div class="container">
            <div class="card" v-for="item in list">
               <h3>{{item.title}}</h3>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/frontend/NavBar.vue'
// export default {
//     name: 'About',
//     data() {
//         return {
//             test: 'Lorem 10',
//             count: 0,
//             list: [],
//         }
//     },
//     components: {
//         Header,
//     },
//     methods: {
//         increment() {
//             this.count++
//         },
//         decrement() {
//             if (this.count == 0) {
//                 this.count = 0
//             } else {
//                 this.count--
//             }
//         }
//     },
//     mounted(){
//         fetch('https://jsonplaceholder.typicode.com/posts').then(response  => response .json()).then(res => this.list=res);
//     }
// }

import {onMounted, reactive, ref} from 'vue'
export default {
    setup(){
        const count = ref(0);
        const list = reactive([]);
        function increment(){
            count.value++
        }
        function decrement(){
            count.value--
        }
        onMounted(() => {
            fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json())
                .then((data) => {
                    list.value = data;
                })
        })
        return{
            count, increment,decrement, list
        }
    },
    
    components: {
        Header,
    },
}
</script>

<style lang="scss" scoped>

</style>