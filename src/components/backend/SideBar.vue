<template>
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
    <ul class="nav">
      <li class="nav-item">
        <router-link class="nav-link" to="/">
          <i class="ti-home menu-icon"></i>
          <span class="menu-title">Home</span>
        </router-link>
      </li>
      <li class="nav-item" >
        <router-link class="nav-link" to="/overview">
          <i class="ti-bar-chart-alt menu-icon"></i>
          <span class="menu-title">Overview</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/banner">
          <i class="ti-bag menu-icon"></i>
          <span class="menu-title">Banner</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/products">
          <i class="ti-package menu-icon"></i>
          <span class="menu-title">Products</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/checkout">
          <i class="ti-bell menu-icon"></i>
          <span class="menu-title">Checkout</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/profile">
          <i class="ti-user menu-icon"></i>
          <span class="menu-title">Profile</span>
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="logout()">
          <i class="ti-power-off menu-icon"></i>
          <span class="menu-title">Logout</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { auth } from "@/firebase/firebase"
import { signOut } from "firebase/auth"
  export default {
    name: "SideBar",
    methods:{
      logout() {
        signOut(auth)
          .then((res) => {
              this.$router.push({ path: "/" })
              vToast.fire({
                  icon: "success",
                  title: "Sign out Successfully",
              })
          })
          .catch((error) => {
              alert(error.message)
          })
        },
    }
  }
</script>

<style lang="scss">

</style>