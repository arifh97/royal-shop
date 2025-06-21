<!-- @format -->

<template>
    <div class="heading">
        <nav class="navbar col-lg-12 col-12 p-0 d-flex flex-row fixed-top">
            <div
                class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center"
            >
                <router-link class="navbar-brand brand-logo me-5" to="/"
                    ><img
                        src="../../assets/backend/images/logo.svg"
                        class="me-2"
                        alt="logo"
                /></router-link>
                <router-link class="navbar-brand brand-logo-mini" to="/"
                    ><img
                        src="../../assets/backend/images/logo-mini.svg"
                        alt="logo"
                /></router-link>
            </div>
            <div
                class="navbar-menu-wrapper d-flex align-items-center justify-content-end"
            >
                <button
                    class="navbar-toggler navbar-toggler align-self-center"
                    type="button"
                    @click="sidebar()"
                    data-toggle="minimize"
                >
                    <span class="ti-view-list"></span>
                </button>
                <ul class="navbar-nav mr-lg-2">
                    <li class="nav-item nav-search d-none d-lg-block">
                        <div class="input-group">
                            <div
                                class="input-group-prepend hover-cursor"
                                id="navbar-search-icon"
                            >
                                <span class="input-group-text" id="search">
                                    <i class="ti-search"></i>
                                </span>
                            </div>
                            <input
                                type="text"
                                class="form-control"
                                id="navbar-search-input"
                                placeholder="Search now"
                                aria-label="search"
                                aria-describedby="search"
                            />
                        </div>
                    </li>
                </ul>
                <ul class="navbar-nav navbar-nav-right">
                    <li class="nav-item dropdown me-1">
                        <a
                            class="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center"
                            id="messageDropdown"
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                            <i class="ti-email mx-0"></i>
                        </a>
                        <div
                            class="dropdown-menu dropdown-menu-right navbar-dropdown"
                            aria-labelledby="messageDropdown"
                        >
                            <p
                                class="mb-0 font-weight-normal float-left dropdown-header"
                            >
                                Messages
                            </p>
                            <a class="dropdown-item">
                                <div class="item-thumbnail">
                                    <img
                                        src="../../assets/backend/images/faces/face1.jpg"
                                        alt="image"
                                        class="profile-pic"
                                    />
                                </div>
                                <div class="item-content flex-grow">
                                    <h6 class="ellipsis font-weight-normal">
                                        David Grey
                                    </h6>
                                    <p
                                        class="font-weight-light small-text text-muted mb-0"
                                    >
                                        The meeting is cancelled
                                    </p>
                                </div>
                            </a>
                            <a class="dropdown-item">
                                <div class="item-thumbnail">
                                    <img
                                        src="../../assets/backend/images/faces/face2.jpg"
                                        alt="image"
                                        class="profile-pic"
                                    />
                                </div>
                                <div class="item-content flex-grow">
                                    <h6 class="ellipsis font-weight-normal">
                                        Tim Cook
                                    </h6>
                                    <p
                                        class="font-weight-light small-text text-muted mb-0"
                                    >
                                        New product launch
                                    </p>
                                </div>
                            </a>
                            <a class="dropdown-item">
                                <div class="item-thumbnail">
                                    <img
                                        src="../../assets/backend/images/faces/face3.jpg"
                                        alt="image"
                                        class="profile-pic"
                                    />
                                </div>
                                <div class="item-content flex-grow">
                                    <h6 class="ellipsis font-weight-normal">
                                        Johnson
                                    </h6>
                                    <p
                                        class="font-weight-light small-text text-muted mb-0"
                                    >
                                        Upcoming board meeting
                                    </p>
                                </div>
                            </a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link count-indicator dropdown-toggle"
                            id="notificationDropdown"
                            href="#"
                            data-bs-toggle="dropdown"
                        >
                            <i class="ti-bell mx-0"></i>
                            <span class="count"></span>
                        </a>
                        <div
                            class="dropdown-menu dropdown-menu-right navbar-dropdown"
                            aria-labelledby="notificationDropdown"
                        >
                            <p
                                class="mb-0 font-weight-normal float-left dropdown-header"
                            >
                                Notifications
                            </p>
                            <a class="dropdown-item">
                                <div class="item-thumbnail">
                                    <div class="item-icon bg-success">
                                        <i class="ti-info-alt mx-0"></i>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <h6 class="font-weight-normal">
                                        Application Error
                                    </h6>
                                    <p
                                        class="font-weight-light small-text mb-0 text-muted"
                                    >
                                        Just now
                                    </p>
                                </div>
                            </a>
                            <a class="dropdown-item">
                                <div class="item-thumbnail">
                                    <div class="item-icon bg-warning">
                                        <i class="ti-settings mx-0"></i>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <h6 class="font-weight-normal">Settings</h6>
                                    <p
                                        class="font-weight-light small-text mb-0 text-muted"
                                    >
                                        Private message
                                    </p>
                                </div>
                            </a>
                            <a class="dropdown-item">
                                <div class="item-thumbnail">
                                    <div class="item-icon bg-info">
                                        <i class="ti-user mx-0"></i>
                                    </div>
                                </div>
                                <div class="item-content">
                                    <h6 class="font-weight-normal">
                                        New user registration
                                    </h6>
                                    <p
                                        class="font-weight-light small-text mb-0 text-muted"
                                    >
                                        2 days ago
                                    </p>
                                </div>
                            </a>
                        </div>
                    </li>
                    <li class="nav-item nav-profile dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            data-bs-toggle="dropdown"
                            id="profileDropdown"
                        >
                        <div class="profile-img">
                            <img :src="info.profile" alt="profile" />
                        </div>
                        </a>
                        <div
                            class="dropdown-menu dropdown-menu-right navbar-dropdown"
                            aria-labelledby="profileDropdown"
                        >
                            <router-link to="/" class="dropdown-item">
                                <i class="ti-home text-primary"></i>
                                Home
                            </router-link>
                            <router-link to="/profile" class="dropdown-item">
                                <i class="ti-user text-primary"></i>
                                Profile
                            </router-link>
                            <a @click="logout()" class="dropdown-item">
                                <i class="ti-power-off text-primary"></i>
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>
                <button
                    class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                    type="button"
                    data-toggle="offcanvas"
                >
                    <span class="ti-view-list"></span>
                </button>
            </div>
        </nav>
    </div>
</template>

<script>
import { auth, db } from "@/firebase/firebase"
import { signOut } from "firebase/auth"
import {onSnapshot , doc} from 'firebase/firestore'
export default {
    name: "Header",
    data(){
      return{
        info:{
          profile: '/img/avatar.png',
        }
      }
    },
    mounted(){
      onSnapshot (doc(db, "profiles" , auth.currentUser.uid), (doc) => {
        this.info.profile = doc.data().profile;
      })
    },
    methods: {
        sidebar() {
            $("body").toggleClass("sidebar-icon-only")
        },
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
    },
}
</script>

<style scoped lang="scss">
  .profile-img {
      --user: 40px;
      width: var(--user);
      height: var(--user);
      border-radius: 100%;
      overflow: hidden;
      & img {
          width: 100%;
          height: 100%;
          object-fit: cover;
      }
  }
</style>
