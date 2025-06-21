<template>
  <!-- heading area start -->
  <NavBar />
  <!-- heading area start -->

  <!-- banner area start -->
  <BannerArea />
  <!-- banner area start -->

  <!-- products area start -->
  <div class="product_section mb-5 container">
    <div class="row">
      <div class="col-md-12 text-center">
        <div class="row">
          <div class="col-sm-6 col-md-4 col-lg-4" v-for="item in products" :key="item.id">
            <div class="box">
                <div class="option_container">
                    <div class="options">
                        <a href="/" @click.prevent="addToCart(item.data())" class="option1"> Add To Cart </a>
                        <a href="" class="option2"> Buy Now </a>
                    </div>
                </div>
                <div class="img-box">
                    <img
                        :src="item.data().image.url"
                        :alt="item.data().image.name"
                    />
                </div>
                <div class="detail-box">
                    <h5>{{item.data().title}}</h5>
                    <h6>${{item.data().price}}</h6>
                </div>
            </div>
          </div>
        </div>
        <div class="btn-box">
          <router-link to="/product">
            View All products
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <!-- products area start -->

  <!-- footer area start -->
  <Footer />
  <!-- footer area start -->

  <!-- preloader start -->
  <div v-if="this.$store.state.preloader" class="d-flex justify-content-center align-items-center bg-white w-100 vh-100 position-fixed top-0 left-0" style="z-index: 9;">
        <div class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
  <!-- preloader end -->
</template>

<script>
  import {db} from '@/firebase/firebase'
  import BannerArea from "@/components/frontend/BannerArea";
  import Product from "@/components/frontend/Product";
  import { collection, query, onSnapshot, limit } from "firebase/firestore";
  import addcart from '@/Mixins/AddToCart';
  export default {
    name: 'HomeView',
    mixins: [addcart],
    components: {Product, BannerArea},
    data(){
      return{
        products: [],
      }
    },
    mounted(){
      onSnapshot(query(collection(db, "products"), limit(6)), (res => {
        this.products=[];
        res.forEach(doc => {
          this.products.push(doc);
        })
      }))
    }
  }
</script>

<style scoped lang="scss">

</style>