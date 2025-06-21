<template>
  <nav-bar />

  <section class="inner_page_head">
    <div class="container_fuild">
      <div class="row">
        <div class="col-md-12">
          <div class="full">
            <h3>Product Grid</h3>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="product_section layout_padding">
      <div class="container">
          <div class="heading_container heading_center">
              <h2>Our <span>products</span></h2>
          </div>
          <div class="row" v-if="this.$store.state.preloader">
            <div class="col-md-12 w-100 vh-100 position-relative">
              <InlinePreloader />
            </div>
          </div>
          <div class="row" v-if="!this.$store.state.preloader">
              <div class="col-sm-6 col-md-4 col-lg-4" v-for="item in products" :key="item.id">
                  <div class="box">
                      <div class="option_container">
                          <div class="options">
                              <a href="#" @click.prevent="addToCart(item.data())" class="option1"> Add To Cart </a>
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
              <div class="col-md-12">
                <div class="btn-box">
                  <a href='#'>See more</a>
                </div>
              </div>
          </div>
      </div>
  </section>

  <Footer />
</template>

<script>
import {db} from '@/firebase/firebase'
import { collection, query, onSnapshot} from 'firebase/firestore'
import addcart from '@/Mixins/AddToCart';
export default {
  name: "ProductView",
  mixins: [addcart],
  data(){
    return{
      products: [],
    }
  },
  computed:{
    
  },
  mounted(){
    this.$store.commit('loader', true);
    onSnapshot(query(collection(db, "products")), (res) => {
        this.products=[];
        this.$store.commit('loader', false);
        res.forEach((doc) => {
          this.products.push(doc);
        })
    })
  }
}
</script>

<style scoped>

</style>