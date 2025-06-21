<template>
  <Header />
  <div class="container-fluid page-body-wrapper pt-0 proBanner-padding-top">
    <side-bar/>
    <div class="main-panel">
      <div class="content-wrapper">
         <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/backend/Header";
  import SideBar from "@/components/backend/SideBar";
  export default {
    name: "DashboardPage",
    components: {SideBar, Header}
  }
</script>

<style scoped>

</style>