<template>

  <nav-bar />

  <section class="inner_page_head">
    <div class="container_fuild">
      <div class="row">
        <div class="col-md-12">
          <div class="full">
            <h3>Contact us</h3>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="why_section layout_padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <div class="full">
            <form action="index.html">
              <div class="form-group">
                <label for="exampleInputUsername1">Name*</label>
                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Enter your name">
              </div>
              <div class="form-group">
                <label for="exampleInputUsername1">E-mail*</label>
                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Enter your Email">
              </div>
              <div class="form-group">
                <label for="exampleInputUsername1">Subject</label>
                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Enter your Subject">
              </div>
              <div class="form-group">
                <label for="exampleInputUsername1">Message *</label>
                <textarea type="text" class="form-control" id="exampleInputUsername1" placeholder="Write something..."></textarea>
              </div>
              <div class="form-group text-center">
                <button type="button" class="btn btn-primary btn-lg">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Footer />
<div>
  <h1>Contact page</h1>
</div>
  <Footer />
</template>

<script>
export default {
  name: "ContactView"
}
</script>

<style scoped>

</style>