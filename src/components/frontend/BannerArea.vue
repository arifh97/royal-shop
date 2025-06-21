<template>
  <Carousel :items-to-show="1" v-if="banners.length !==0">
    <Slide v-for="(banner, index) in banners" :key="index">
      <section class="slider_section vh-100">
        <div class="slider_bg_box">
          <img :src="banner.image.url" :alt="banner.image.name">
        </div>
        <div class="container ">
          <div class="row">
            <div class="col-md-7 col-lg-6 text-start">
              <div class="detail-box">
                <h1>
                  {{banner.title}}
                </h1>
                <p>
                  {{banner.subtitle}}
                </p>
                <div class="btn-box">
                  <router-link to='/banner' href="" class="btn1">
                    Shop Now
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </slide>

    <template #addons>
      <Pagination />
    </template>

  </carousel>
</template>

<script>
import {db} from '@/firebase/firebase'
import 'vue3-carousel/dist/carousel.css'
import {collection,query, onSnapshot} from 'firebase/firestore'
import { Carousel, Slide, Pagination } from 'vue3-carousel';
  export default {
    name: "BannerArea",
    data(){
      return{        
          banners:[],
          jsonData:[],
      }
    },
    components: { Carousel, Slide, Pagination},
    
    mounted(){        
        this.$store.commit('loader', true);
        onSnapshot(query(collection(db, "banner")), (res) => {
          this.banners = [],
            this.$store.commit('loader', false);
          res.forEach((doc) => {
            this.banners.push(doc.data());
          })
        })

    },
  }
</script>

<style scoped>

</style>