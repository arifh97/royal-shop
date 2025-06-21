<!-- @format -->

<template>
    <div class="profile">
    <div class="row">
        <div class="col-md-12 grid-margin">
            <div class="d-flex align-items-center">
                <div class="col-md-6">
                    <h3 class="font-weight-bold mb-0">My Profile</h3>
                </div>
            </div>
        </div>
    </div>
    <div class="row justify-content-center position-relative">
        <InlinePreloader />
        <div class="col-md-8">
            <div class="profile_img mb-5">
                <img :src="info.profile" :alt="info.fname" />
            </div>
            <div class="profile_info">
                <form class="forms-sample" @submit.prevent="updateProfile()">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleInputUsername1">Full Name</label>
                                <input type="text" class="form-control" v-model="info.name" placeholder="e.g. jhon smith" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control bg-white" v-model="info.email" placeholder="e.g. example@mail.com" readonly="readonly" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" v-model="info.password" placeholder="Password" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleInputConfirmPassword1">Confirm Password</label>
                                <input type="password" class="form-control" v-model="cpassword" placeholder="Password" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleInputConfirmPassword1">Upload Phooto</label>
                                <input type="file" class="form-control" @change="uploadImage" />
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-3">
                        <button type="submit" class="btn btn-primary text-white">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import { db, auth } from "@/firebase/firebase"
import { doc, onSnapshot, setDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
export default {
    name: "Profile",
    data() {
        return {
            info: {
                name: null,
                email: null,
                profile: null,
                password: null,
            },
            cpassword: null,
            currentUid: "",
        }
    },
    created() {
        this.$store.commit("loader", true)
        onSnapshot(doc(db, "profiles", auth.currentUser.uid), (doc) => {
            let data = doc.data()
            this.info.name = data.name
            this.info.email = data.email
            this.info.password = data.password
            this.cpassword = data.password
            this.info.profile = data.profile
            this.$store.commit("loader", false)
        }),
        onAuthStateChanged(auth, (user) => {
            this.currentUid = auth.currentUser.uid
        })
    },
    methods: {
        updateProfile() {
            this.$store.commit('loader', true)
            if (this.info.password == this.cpassword) {
                setDoc(doc(db, "profiles", this.currentUid), this.info)
                    .then((res) => {
                        this.$store.commit('loader', false)
                        vToast.fire({
                            icon: "success",
                            title: "Oparation success",
                        })
                    })
                    .catch((error) => {
                        vToast.fire({
                            icon: "error",
                            title: error.message,
                        })
                    })
            } else {
                vToast.fire({
                    icon: "error",
                    title: "password & confirm password not match",
                })
            }
        },
        uploadImage(e) {
            const self = this
            const file = e.target.files[0]
            let reader = new FileReader()
            reader.onload = function (e) {
                self.info.profile = e.target.result
            }
            reader.readAsDataURL(file)
        },
    },
}
</script>

<style lang="scss">
.profile_img {
    --user: 250px;
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
