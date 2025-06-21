<template>
  <!-- heading area start -->
  <NavBar />
  <!-- heading area start -->
    <div class="container-scroller">
    <div class="container-fluid">
      <div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto bg-white p-5 text-center">
            <img src="@/assets/404.gif" class="w-100" alt="">
            <h1>Page Not Found</h1>
            <p>404 not Found</p>
          </div>
        </div>
      </div>
    </div>
  </div>  

  <!-- footer area start -->
  <Footer />
  <!-- footer area start -->
</template>

<script>
    export default {
        name: 'NotFound',
        return(){
          image = 'arif'
        }
    }
</script>

<style lang="scss" scoped>

</style>