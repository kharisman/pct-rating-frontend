<template>
    <div>
      <div class="container" v-if="!loading && form">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
            <li class="breadcrumb-item active" aria-current="page">{{ form.name }}</li>
          </ol>
        </nav>
        <div class="row">
          <div v-for="dosen in dosens" :key="dosen.id" class="col-md-3 mb-3">
            <div class="card" >
                <div class="card-body">
                <h5 class="card-title">{{ dosen.name }}</h5>
                <router-link :to="{ name: 'rating', params: { id: form.id, s: dosen.id } }" class="btn btn-primary">
                    Beri Rating
                </router-link>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="loading">
        <Loading />
      </div>
      <div v-else>
        <div  class="container">
            <h1>404 - Data Not Found</h1>
            <router-link to="/"> Kembali </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '@/axios';
  import Loading from '@/components/Loading.vue';
  
  export default {
    components: {
      Loading,
    },
    data() {
      return {
        form: null,
        formId: null,
        loading: true,
        dosens: null,
      };
    },
  
    methods: {
      async getForm() {
        try {
          this.formId = this.$route.params.id;
  
          const data = {
            id: this.formId,
          };
  
          const response = await axios.post('dosens', data);
  
          if (response.data.data) {
            this.form = response.data.data;
            this.dosens = response.data.dosen;
          } else {
            // Jika data tidak ditemukan, arahkan ke halaman 404
            this.$router.push('/404');
          }
        } catch (error) {
          console.error(error);
        } finally {
          // Setelah selesai memuat data, atur loading menjadi false
          this.loading = false;
        }
      },
    },
  
    mounted() {
      this.getForm();
    },
  };
  </script>
  
  <style>
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .card {
    width: 18rem;
    margin: 10px;
  }
  </style>
  