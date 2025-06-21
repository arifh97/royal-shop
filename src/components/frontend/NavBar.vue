<template>
    <div class="header_section">
        <div class="container">
            <nav
                class="navbar navbar-expand-lg custom_nav-container shadow-none"
            >
                <router-link class="navbar-brand" to="/"
                    ><img
                        width="250"
                        src="../../assets/backend/images/logo.svg"
                        alt="#"
                /></router-link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class=""> </span>
                </button>
                <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul class="navbar-nav align-items-center">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/"
                                >Home</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/product"
                                >Products</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/blog"
                                >Blog</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/contact"
                                >Contact</router-link
                            >
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link position-relative" to="/checkout">
                                <i :class="this.$store.state.carts.length == 0 ? 'ti-shopping-cart' : 'ti-shopping-cart-full' " style="font-size: 20px;"></i>
                                <span class="dots">{{this.$store.state.carts.length}}</span>
                            </router-link>
                        </li>
                        <li class="nav-item" v-if="!login">
                            <router-link
                                to="/login"
                                class="btn btn-primary btn-md"
                            >
                                <i class="ti-user"></i>
                                Login
                            </router-link>
                        </li>
                        <li class="nav-item nav-profile dropdown" v-if="login">
                            <router-link class="nav-link" to="/dashboard">
                                <div class="profile-img">
                                    <img :src="info.profile" alt="profile" />
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
import { auth, db } from "@/firebase/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { onSnapshot, doc } from "firebase/firestore"

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Header",
    data() {
        return {
            login: false,
            info: {
                profile: "/img/avatar.png",
            },
            currentUser: null,
        }
    },
    created() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.login = true;
                this.currentUser = user.uid;                
                onSnapshot(doc(db, "profiles", this.currentUser), (doc) => {
                    this.info.profile = doc.data().profile;
                });
            } else {
                this.login = false
            }
        })
    },
    methods: {},
}
</script>

<style scoped lang="scss">
.btn {
    border-color: #f7444e;
    color: #f7444e;
    background-color: transparent;
    font-weight: 600;
    font-size: 16px;
    &:hover {
        background-color: #f7444e;
        color: white;
    }
}
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
.dots{
    --width: 18px;
    width: var(--width);
    height: var(--width);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f7444e;
    color: white;
    border-radius: 100%;
    font-size: 12px;
    font-weight: 400;
    position: absolute;
    top: 0;
    right: 10px;
}
</style>
