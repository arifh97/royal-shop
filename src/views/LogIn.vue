<!-- @format -->

<template>
    <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper d-flex align-items-center auth px-0">
                <div class="row w-100 mx-0">
                    <div class="col-lg-4 mx-auto">
                        <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                            <div class="brand-logo">
                                <img src="../assets/backend/images/logo.svg" alt="logo" />
                            </div>
                            <h4>Hello! let's get started</h4>
                            <h6 class="font-weight-light">
                                Sign in to continue.
                            </h6>
                            <div class="pt-3">
                                <div class="form-group">
                                    <input type="email" class="form-control form-control-lg" id="exampleInputEmail1"
                                        placeholder="E-mail" v-model="email" />
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control form-control-lg"
                                        id="exampleInputPassword1" placeholder="Password" v-model="password" />
                                </div>
                                <div class="my-2 d-flex justify-content-between align-items-center">
                                    <div class="form-check">
                                        <label class="form-check-label text-muted">
                                            <input type="checkbox" class="form-check-input" />
                                            Keep me signed in
                                            <i class="input-helper"></i></label>
                                    </div>
                                    <router-link to="/forget" class="auth-link text-black">Forgot password?
                                    </router-link>
                                </div>
                                <div class="mt-3 text-center">
                                    <button
                                        class="btn btn-block btn-primary btn-lg font-weight-medium text-white auth-form-btn"
                                        @click="login()">
                                        SIGN IN
                                    </button>
                                </div>
                                <div class="text-center mt-5 font-weight-light">
                                    Don't have an account?
                                    <router-link to="/signup" class="text-primary">Create</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- content-wrapper ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>
</template>

<script>
import { app } from "@/firebase/firebase"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
export default {
    name: "LogIn",
    data() {
        return {
            email: "",
            password: "",
        }
    },
    created() {
        const auth = getAuth(app);
        const fullPath = this.$router.currentRoute.value.fullPath;
        const x = this.$router.currentRoute.value.fullPath
            .split("/")
            .splice(-1)
        onAuthStateChanged(auth, user => {
            if (user) {
                this.$router.push('/' + x)
            } else {
                this.$router.push(fullPath)
            }
        })
    },
    methods: {
        login() {
            const auth = getAuth(app)
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then((user) => {
                    this.currentPath()
                    vToast.fire({
                        icon: "success",
                        title: " Welcome back",
                    })
                })
                .catch((error) => {
                    vToast.fire({
                        icon: "error",
                        title: error.message,
                    })
                })
        },
        currentPath() {
            const x = this.$router.currentRoute.value.fullPath
                .split("/")
                .splice(-1)
            if (x == "login") {
                this.$router.push({ path: "/dashboard" })
            } else {
                this.$router.push({ path: "/" + x })
            }
        },
    },
}
</script>

<style scoped>

</style>
