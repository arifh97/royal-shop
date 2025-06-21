<template>
  <div class="products">
    <div class="row">
        <div class="col-md-12 grid-margin">
            <div class="d-flex align-items-center">
                <div class="col-md-6">
                    <h3 class="font-weight-bold mb-0">Add New Product</h3>
                </div>
                <div class="col-md-6">
                    <button type="button" class="btn-icon-text outline-none btn btn-inverse-primary btn-fw" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="ti-plus btn-icon-prepend"></i>Add Product</button>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body position-relative">
                    <inline-preloader />
                    <h4 class="card-title">Product List</h4>
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th style="width: 25%;">Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item) in products" :key="item.id">
                                    <td>
                                        <div class="custom-img">
                                            <img :src="item.data().image.url" :alt="item.data().image.name" />
                                        </div>
                                    </td>
                                    <td>{{item.data().title}}</td>
                                    <td>
                                       $ {{item.data().price}}
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-primary btn-rounded btn-fw text-white" @click="editItem(item.id)" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>
                                        <button type="button" class="btn btn-danger btn-rounded btn-fw text-white ml-3" @click="deleteItem(item)">Delete</button>
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
                        Add New Product
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleInputUsername1">Title</label>
                                <input type="text" class="form-control" id="exampleInputUsername1" placeholder="title" v-model="product.title" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleInputUsername2">Price</label>
                                <input type="text" class="form-control" id="exampleInputUsername2" placeholder="price" v-model="product.price" />
                            </div>
                        </div>
                        <div class="col-md-8">
                          <div class="form-group">
                                <label for="exampleInputUsername2">Descriptions</label>
                                <quill-editor v-model:content="product.description" contentType="html" theme="snow"></quill-editor>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="exampleInputUsername2">Keywords</label>
                                <input type="text" class="form-control" id="exampleInputUsername2" placeholder="keywords..." v-model="keyword" @keyup.enter="addTag" />
                            </div>
                            <ul class="keylist list-unstyled p-0 m-0">
                                <li @click="tagremove(index)" v-for="(item, index) in product.keywords" :key="index" class="text-success border rounded-3 d-inline-block border-success py-1 px-2 me-1 mb-1">
                                    {{item}} &times;
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="exampleInputUsername2">Add image</label>
                                <input type="file" class="form-control" id="exampleInputUsername2" @change="uploadImage" />
                            </div>
                            <div class="progress rounded-3" v-if="uploadStatus != 0 && uploadStatus <= 100">
                                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :aria-valuenow="uploadStatus" aria-valuemin="0" aria-valuemax="100" :style="{'width': uploadStatus + '%'}"></div>
                            </div>
                        </div>
                        <div class="col-md-6 text-center" v-if="product.image.name">
                            <div class="banner-img w-100">
                                <img :src="product.image.url" :alt="product.image.name" class="w-100">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary text-white" data-bs-dismiss="modal" @click="reset()">Close</button>
                    <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" @click="add()" v-if="!editProduct" :disabled="uploadStatus < 100">Save</button>
                    <button type="button" class="btn btn-primary text-white" data-bs-dismiss="modal" @click="edit()" v-if="editProduct">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { db, storage} from '@/firebase/firebase'
import {collection, addDoc, query, onSnapshot, doc, getDoc, deleteDoc, setDoc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
  export default {
    name: "Products",
    components:{QuillEditor},
    data(){
      return{
        uploadStatus: 0,
        editProduct: false,
        product:{
          title: null,
          price: null,
          description: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available",
          keywords:[],
          image: {
            name: null,
            url: null,
          },
        },
        keyword: '',
        products:[],
        activeId: null,
      }
    },
    mounted(){
        this.$store.commit("loader", true);
        onSnapshot(query(collection(db, "products")), (res) => {
            this.products=[];
            this.$store.commit("loader", false);
            res.forEach((doc) => {
                this.products.push(doc);
            })
        })
    },
    methods: {
        editItem(id){
            this.editProduct = true;
            this.activeId = id;
            onSnapshot(doc(db, "products", id), (doc) => {
                this.product = doc.data();
            })
        },
        edit(){
            updateDoc(doc(db, "products", this.activeId), this.product)
                .then((res) => {
                    vToast.fire({
                        icon: 'success',
                        title: 'Product edit successfully'
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
            addDoc(collection(db, "products"), this.product)
                .then((res) => {
                    vToast.fire({
                        icon: "success",
                        title: 'Product added successfully'
                    })
                    this.reset();
                })
                .catch((error) => {
                    vToast.fire({
                        icon: "success",
                        title: error.message
                    })
                })
        },
        tagremove(id){
            this.product.keywords.splice(id, 1)
        },
        addTag(){
            this.product.keywords.push(this.keyword);
            this.keyword = "";
        },
        deleteItem(item){
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
                        deleteDoc(doc(db, "products", item.id));
                        deleteObject(ref(storage, "product-image/" + item.data().image.name));
                        Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                        )
                    }
            })
        },
        uploadImage(e){
            let file = e.target.files[0];
            const metadata = {
            contentType: 'image/jpeg'
            };

            const storageRef = ref(storage, "product-image/" + file.name);
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
                    this.product.image = img;
                });
                }
            );
        },
        reset(){
            this.product.title = null;
            this.product.price = null;
            this.product.description = null;
            this.product.keywords = [];
            this.product.image.name = null;
            this.product.image.url = null;
            this.uploadStatus= 0;
        },
    }
  }
</script>

<style lang="scss" scpoed>

    .custom-img{
        & img{
            object-fit: contain !important;
        }
    }
    .keylist{
        & li{
            font-size: 14px;
            cursor: pointer;
        }
    }
</style>