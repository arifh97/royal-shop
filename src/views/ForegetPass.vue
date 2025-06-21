<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">
              <div class="brand-logo">
                <img src="../assets/backend/images/logo.svg" alt="logo">
              </div>
              <h4>Hello!, Enter your valid email address</h4>
              <div class="pt-3">
                <div class="form-group text-center" v-if="success">
                  <img src="../assets/frontend/images/success.gif" alt="" style="width: 300px">
                  <p class="mt-3">Check your <span class="text-behance">{{email}}</span> email</p>
                </div>
                <div class="form-group" v-if="!success">
                  <input type="email" class="form-control form-control-lg" id="exampleInputEmail1" placeholder="Enter your email" v-model="email">
                </div>
                <div class="mt-3 text-center">
                  <button class="btn btn-block btn-primary btn-lg font-weight-medium text-white auth-form-btn" @click="login()" :disabled='success'>
                    <span v-if="!success">SEND RESET LINK</span>
                    <span v-if="success">CHECK INBOX OR SPAM</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {auth} from '@/firebase/firebase'
    import {sendPasswordResetEmail} from 'firebase/auth'
    export default {
        name: 'ForgetPass',
        data(){
            return{
                success: false,
                email: null,
            }
        },
        methods:{
            login(){
                sendPasswordResetEmail(auth, this.email)
                    .then((res) => {
                        this.success = true;
                    })
                    .catch(error => {
                        vToast.fire({
                            icon: 'error',
                            title: error.message
                        })
                    })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>