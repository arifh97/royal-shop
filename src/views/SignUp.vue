<!-- @format -->

<template>
    <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper d-flex align-items-center auth px-0">
                <div class="row w-100 mx-0">
                    <div class="col-lg-4 mx-auto">
                        <div
                            class="auth-form-light text-left py-5 px-4 px-sm-5"
                        >
                            <div class="brand-logo">
                                <img
                                    src="../assets/backend/images/logo.svg"
                                    alt="logo"
                                />
                            </div>
                            <h4>New here?</h4>
                            <h6 class="font-weight-light">
                                Signing up is easy. It only takes a few steps
                            </h6>
                            <div class="pt-3">
                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control form-control-lg"
                                        id="exampleInputUsername1"
                                        placeholder="Name"
                                        v-model="info.name"
                                    />
                                </div>
                                <div class="form-group">
                                    <input
                                        type="email"
                                        class="form-control form-control-lg"
                                        id="exampleInputEmail1"
                                        placeholder="Email"
                                        v-model="info.email"
                                    />
                                </div>
                                <div class="form-group">
                                    <input
                                        type="password"
                                        class="form-control form-control-lg"
                                        id="exampleInputPassword1"
                                        placeholder="Password"
                                        v-model="info.password"
                                    />
                                </div>
                                <div class="mb-4">
                                    <div class="form-check">
                                        <label
                                            class="form-check-label text-muted"
                                        >
                                            <input
                                                type="checkbox"
                                                class="form-check-input"
                                                v-model="agree" />
                                            I agree to all Terms &amp;
                                            Conditions
                                            <i class="input-helper"></i
                                        ></label>
                                    </div>
                                </div>
                                <div class="mt-3 text-center">
                                    <button
                                        class="btn text-white btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                                        @click="signUp()"
                                        :disabled="agree ? false : true"
                                    >
                                        SIGN UP
                                    </button>
                                </div>
                                <div class="text-center mt-4 font-weight-light">
                                    Already have an account?
                                    <router-link
                                        to="/login"
                                        class="text-primary"
                                        >Login</router-link
                                    >
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
import { auth, db } from "@/firebase/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import {doc, setDoc} from 'firebase/firestore'
export default {
    name: "SignUp",
    data() {
        return {
            info: {
              name: "",
              email: "",
              password: "",
              profile: '/img/avatar.png'
            },
            agree: false,
            userid: null,
        }
    },
    methods: {
        signUp() {
            createUserWithEmailAndPassword(auth, this.info.email, this.info.password)
                .then((res) => {
                    this.$router.push({ path: "/dashboard" })
                    this.userid = res.user.uid;                    
                    setDoc(doc(db, "profiles", this.userid), this.info);
                    vToast.fire({
                        icon: "success",
                        title: "User create Successfully",
                    })
                })
                .catch((error) => {
                    vToast.fire({
                        icon: "error",
                        title: error.message,
                    })
                });
        },
    },
}
</script>

<style scoped lang="scss"></style>
