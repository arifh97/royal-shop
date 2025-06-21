<template>
    <div class="banner">
        <div class="row">
            <div class="col-md-12 grid-margin">
                <div class="d-flex align-items-center">
                    <div class="col-md-6">
                        <h3 class="font-weight-bold mb-0">Add New Banner</h3>
                    </div>
                    <div class="col-md-6">
                        <button type="button" class="btn-icon-text btn btn-inverse-primary btn-fw" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="ti-plus btn-icon-prepend"></i>Add Banner</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row position-relative">
            <div v-if="this.$store.state.preloader" class="d-flex justify-content-center align-items-center bg-white w-100 h-100 position-absolute top-0 left-0" style="z-index: 9;">
                <div class="spinner-grow" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Banner List</h4>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th style="width: 3%;">Sl</th>
                                        <th style="width: 20%;">Image</th>
                                        <th style="width: 52%;">Name.</th>
                                        <th style="width: 25%;">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in banners" :key="item.data().id">
                                        <td>
                                            <span>{{index + 1}}</span>
                                        </td>
                                        <td>
                                            <div class="banner-img">
                                                <img :src="item.data().image.url" :alt="item.data().image.name" />
                                            </div>
                                        </td>
                                        <td>
                                            <h5 class="fw-bold">{{item.data().title}}</h5>
                                            <span class="d-block fw-light text-black-50" style="font-size: 14px; line-height: 1.683; white-space: normal; word-break: break-word;">
                                                {{item.data().subtitle}}
                                            </span>
                                        </td>
                                        <td>
                                            <button type="button" class="btn btn-primary btn-rounded btn-fw text-white" @click="editProduct(item)" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>
                                            <button type="button" class="btn btn-danger btn-rounded btn-fw text-white ml-3" @click="deleteProduct(item)">Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg align-items-center">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                        Add New Banner
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleInputUsername1">Banner Title</label>
                                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Title" v-model="banner.title" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleInputUsername2">Banner Sub Title</label>
                                <input type="text" class="form-control" id="exampleInputUsername2" placeholder="Sub title" v-model="banner.subtitle" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleInputUsername2">Add image</label>
                                <input type="file" class="form-control" id="exampleInputUsername2" :placeholder="banner.image.name" @change="uploadImage" />
                            </div>
                            <div class="progress rounded-3" v-if="uploadStatus != 0 && uploadStatus <= 100">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :aria-valuenow="uploadStatus" aria-valuemin="0" aria-valuemax="100" :style="{'width': uploadStatus + '%'}"></div>
                            </div>
                        </div>
                        <div class="col-md-6" v-if="banner.image.name">
                            <div class="banner-img w-100">
                                <img :src="banner.image.url" :alt="banner.image.name" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary text-white" data-bs-dismiss="modal" @click="reset()">Close</button>
                    <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" @click="add()" v-if="!editBanner" :disabled="uploadStatus < 100">Save</button>
                    <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" @click="edit()" v-if="editBanner">Save</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
/* eslint-disable */
import { db, storage} from '@/firebase/firebase'
import {collection, addDoc, query, onSnapshot, doc, getDoc, deleteDoc, setDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage'
export default {
    name: "Banner",
    data(){
        return{
            editBanner : false,
            activeProductId: null,
            uploadStatus: 0,
            banner: {
                title: '',
                subtitle: '',
                image: {
                  name: null,
                  url: null,
                },
            },
            banners:[],
            contents: [],
        }
    },
    mounted(){
        this.$store.commit('loader', true);
        onSnapshot(query(collection(db, "banner")), (res) => {
            this.banners = [];
            this.$store.commit('loader', false);
            res.forEach((doc) => {
                this.banners.push(doc);
            })
        })
    },
    methods:{
        deleteProduct(item){
          Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                const imageName = item.data().image.name;
                deleteObject(ref(storage, "banner-images/" + imageName));
                deleteDoc(doc(db, "banner", item.id));
              }
            })
        },
        editProduct(item){
          this.editBanner = true;
          this.activeProductId = item.id;
          getDoc(doc(db, "banner", item.id)).then((res) => {
            this.banner= res.data();
          })
        },
        edit(){
          setDoc(doc(db, "banner", this.activeProductId), this.banner)
            .then((res) => {
                vToast.fire({
                    icon: 'success',
                    title: 'Operation successfully'
                })
              this.reset();
            })
            .catch(error => {
                vToast.fire({
                    icon: 'error',
                    title: error.message,
                })
            })
        },
        add(){
            if(this.banner){
              addDoc(collection(db, 'banner'), this.banner)
                  .then((res) => {
                      vToast.fire({
                          icon: 'success',
                          title: 'Operation successfully'
                      })
                    this.reset();
                  })
                  .catch(error => {
                      vToast.fire({
                          icon: 'error',
                          title: error.message,
                      })
                  })
              } else{
              vToast.fire({
                icon: 'error',
                title: 'input field required'
              })
            }
        },
        uploadImage(e){
          let file = e.target.files[0];

          const metadata = {
            contentType: 'image/jpeg'
          };
          const storageRef = ref(storage, 'banner-images/' + file.name);
          const uploadTask = uploadBytesResumable(storageRef, file, metadata);

          uploadTask.on('state_changed',
              (snapshot) => {
                this.uploadStatus = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

              },
              (error) => {
                vToast.fire({
                  icon: 'error',
                  title: error.message
                })
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  const img = {
                    name: file.name,
                    url: downloadURL,
                  }
                  this.banner.image = img;
                });
              }
          );

        },
        reset(){
            this.banner.title='';
            this.banner.subtitle='';
            this.banner.image.name='';
            this.banner.image.url='';
            this.uploadStatus=0;
        }
    }, 
}
</script>

<style lang="scss" scpoed>
    .banner-img{
        width: 250px;
        height: 160px;
        margin-bottom: 15px;
        & img{
            width: 100% !important;
            height: 100% !important;
            object-fit: cover;
            border-radius: 0 !important;
        }

    }
</style>
