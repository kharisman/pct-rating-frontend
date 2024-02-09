<template>
    <div class="container" >
      <!-- Input dan tombol pencarian -->
      <div class="mb-3 mt-3 ">
        <form @submit.prevent="handleSearch" class="d-flex">
            <input v-model="searchTerm" type="text" class="form-control" placeholder="Cari form...">
            <button class="btn btn-warning">Cari</button>
        </form>
      </div>
  
      <div v-if="!loading" class="row">
        <div v-for="form in forms" :key="form.id" class="col-md-4">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">{{ form.name }}</h5>
              <router-link :to="{ name: 'form-detail', params: { id: form.id } }" class="btn btn-primary w-100">
                Pilih Dosen
              </router-link>
            </div>
          </div>
        </div>
        <!-- LoadingBar component -->
        <loading-bar v-if="loadMoreLoading" />
        <div v-else>
            <div v-if="hasMore">
            <a href="#" @click="loadMore" class="">Muat Lebih banyak</a>
            </div>
        </div>
        
      </div>
      <div v-else>
        <Loading />
      </div>
    </div>
</template>
  
  <script>
  import axios from '@/axios';
  import Loading from '@/components/Loading.vue';
import LoadingBar from '@/components/LoadingBar.vue';
  
  export default {
    components: {
      Loading,
      LoadingBar
    },
    data() {
      return {
        forms: null,
        loading: true,
        page: 1,
        pageSize: 5,
        hasMore: true,
        searchTerm: '', // Variabel untuk menyimpan kata kunci pencarian
      loadMoreLoading: false, // Properti loading untuk "Load More"
      };
    },
  
    methods: {
      async getForm() {
        try {
          const data = {
            page: this.page,
            pageSize: this.pageSize,
            search: this.searchTerm,
          };
  
          const response = await axios.post('forms', data);
  
          if (response.data.data && response.data.data.length > 0) {
            this.forms = this.forms ? [...this.forms, ...response.data.data] : response.data.data;
            this.page++;
          } else {
            this.hasMore = false;
          }
        } catch (error) {
        //   console.error(error);
        } finally {
          this.loading = false;
        }
      },
  
      // Handle pencarian saat input berubah
      handleSearch() {
        // Reset halaman dan data sebelumnya
        this.page = 1;
        this.forms = null;
        this.hasMore = true;
  
        // Memanggil fungsi pencarian
        this.getForm();  // Dihapus agar pencarian tidak langsung terjadi saat input berubah
      },
  
      
  
      async loadMore() {
        try {
            this.loadMoreLoading = true; // Mulai loading "Load More"
            await this.getForm(); // Panggil getForm untuk "Load More"
        } finally {
            this.loadMoreLoading = false; // Selesai loading "Load More"
            // console.log("selesai");
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
  
  .card-item {
    width: 18rem;
    margin: 10px;
    opacity: 0; /* Set opasitas awal menjadi 0 */
    animation: fadeIn 0.5s forwards; /* Animasi fadeIn selama 0.5 detik */
  }
  
  @keyframes fadeIn {
    to {
      opacity: 1; /* Set opasitas akhir menjadi 1 */
    }
  }
  </style>
  