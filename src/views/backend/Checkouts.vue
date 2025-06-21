<template>
    <div class="checkout py-4">
        <div class="row position-relative">
            <div class="col-md-8">
                <div class="card rounded-3">
                    <div class="card-body">
                        <h3 class="d-flex border-bottom pb-4 mb-4 align-items-center justify-content-between">Shopping Cart <b>{{this.$store.state.carts.length}}</b></h3>
                        <h3 class="card-title text-primary text-center" v-if="this.$store.state.carts.length == 0">Carts item 0</h3>
                        <div class="table-responsive" v-if="this.$store.state.carts.length > 0">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Product Details</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="cart in this.$store.state.carts" :key="cart.count" :class="cart[cart.length - 1] ? 'arif' : 'vue' ">
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <button class="btn p-0 me-4" @click="this.$store.commit('removeItem', cart)"><i class="ti-close"></i></button>
                                                <div class="custom-img">
                                                    <img :src="cart.img" :alt="cart.title">
                                                </div>
                                                <h5>{{cart.title}}</h5>
                                            </div>
                                        </td>
                                        <td>
                                           <input type="number" v-model="cart.count" min="1" style="width: 30px" class="mx-2 py-2 text-center" readonly>
                                        </td>
                                        <td>$ {{cart.price}}</td>
                                        <td>$ {{cart.price * cart.count}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 position-sticky top-0" style="left:0">
                <div class="card rounded-3">
                    <div class="card-body">
                        <ul class="p-0 mb-0 list-unstyled">
                            <li class="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom" v-for="item in this.$store.state.carts" :key="item.img">
                                <strong>{{item.title}}</strong>
                                <span>$ {{item.price}}</span>
                            </li>
                            <li class="d-flex align-items-center justify-content-between">
                                <strong>Total Price:</strong>
                                <b>$ {{total}}</b>
                            </li>
                        </ul>
                        <div class="mt-4">
                            <button class="btn btn-primary text-white w-100 rounded-3" @click="confirmOrder()">Place order</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Checkouts',
    data(){
        return{
        }
    },
    computed:{
        total(){
            let price = 0;
            let item = this.$store.state.carts;
            for(var i = 0; i< item.length; i++){
                let total = item[i];
                price += total.price * total.count;
            }
            return price;
        },
    },
    methods:{
        confirmOrder(){
            Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                })
                .then((result) => {
                if (result.isConfirmed) {
                    window.localStorage.removeItem('carts');
                    Swal.fire(
                        'Success',
                        'Your order start packing.',
                        'success'
                    )
                }
                })
        }
    }
}
</script>

<style lang="scss" scoped>

    .custom-img {
        width: 150px;
        height: 100px;
        background-color: #f6f6f7;
        padding: 20px;
        margin-right: 15px;
        & img{        
            width: 100% !important;
            height: 100% !important;
            object-fit: contain !important;
            border-radius: 0 !important;
        }
    }

    table{
        & td,
        & th{
            &:first-child{
                padding-left: 0px;
            }
        }
    }

</style>