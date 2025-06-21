<template>
  <nav-bar />

  <section class="inner_page_head">
    <div class="container_fuild">
      <div class="row">
        <div class="col-md-12">
          <div class="full">
            <h3>Blog List</h3>
          </div>
        </div>
      </div>
    </div>
  </section>

  <WhyChoose />

  <Footer />
</template>

<script>
import WhyChoose from "@/components/frontend/WhyChoose";
export default {
  name: "BlogView",
  components: {WhyChoose}
}
</script>

<style scoped>

</style>