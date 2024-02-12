<template>
    <div class="container" >
      
      <div v-if="loadingData" class="mt-4">
        <Loading/>
      </div>
  
      <div v-else class="text-center" >
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
                <li class="breadcrumb-item" aria-current="page">
                    <router-link :to="{ name: 'form-detail', params: { id: form.id } }" >
                    {{ form.name }}
                </router-link>
                </li>
                
                <li class="breadcrumb-item active" aria-current="page">{{ dosen.name }}</li>
            </ol>
        </nav>
        <div class="container mt-4" v-if="form" >
          <div class="product-container">
            <img :src="dosen.picture" alt="Product Image" class="product-image">
            {{ dosen.name }}
            <div class="rating mt-2">
              <span v-for="star in 5" :key="star" @click="selectRating(star)" :class="{ 'filled': star <= selectedRating }">&#9733;</span>
            </div>
          </div>
  
          
  
          <div v-if="submitted" class="mt-3">
            <h5>Terima kasih!</h5>
          </div>
          <div v-else>
  
            <form @submit.prevent="submitRating" class="mt-3">
              <div v-if="validationErrors.Rating" class="mt-3">
                <!-- <p class="text-danger"><strong>Error in Rating:</strong></p> -->
                <ul>
                  <li v-for="error in validationErrors.Rating" :key="error" class="text-danger">{{ error }}</li>
                </ul>
              </div>
  
              <div  class="form-group mt-3 mb-3" v-for="x in form.quests">
                <label>{{ x.name }}</label>
                <div class="reaction-options">
                  <label  v-for="reactionOption in x.answers" :key="x.id+'-'+reactionOption.id" :class="{ 'selected': selectedReactions.includes(x.id+'-'+reactionOption.id+'-'+reactionOption.name) }">
                    <input type="checkbox" :value="x.id+'-'+reactionOption.id+'-'+reactionOption.name" v-model="selectedReactions" class="hidden-checkbox">
                    {{ reactionOption.name }}
                  </label>
                </div>
                <div v-if="validationErrors.Reaksi" class="mt-3">
                  <!-- <p class="text-danger"><strong>Error in Reactions:</strong></p> -->
                  <ul>
                    <li v-for="error in validationErrors.Reaksi" :key="error" class="text-danger">{{ error }}</li>
                  </ul>
                </div>
              </div>
  
              
  
              <div class="form-group">
                <label for="comment">Komentar:</label>
                <textarea v-model="comment" class="form-control mt-2" id="comment" rows="3"></textarea>
                <div v-if="validationErrors.Komentar" class="mt-3">
                  <!-- <p class="text-danger"><strong>Error in Comment:</strong></p> -->
                  <ul>
                    <li v-for="error in validationErrors.Komentar" :key="error" class="text-danger">{{ error }}</li>
                  </ul>
                </div>
              </div>
  
              <button type="submit" class="btn btn-primary mt-3" :disabled="loading">
                {{ loading ? 'Submitting...' : 'Submit Rating' }}
              </button>
            </form>
          
          </div>
        </div>
        <div v-else>
          <div class="alert alert-danger"> Data tidak ditemukan </div>
        </div>
     </div>
  
    </div>
</template>
  
  <script>
  import axios from '@/axios';
  import Loading from '@/components/Loading.vue';
  
  export default {
    components : {
        Loading
    } ,
    data() {
      return {
        selectedRating: 0,
        comment: "",
        submitted: false,
        loading: false,
        selectedReactions: [],
        validationErrors: {},
        form:null,
        loadingData:true,
        dosen:null,
      };
    },
    methods: {
      selectRating(rating) {
        this.selectedRating = rating;
      },
      selectReaction(reactionId) {
        // Toggle selected state
        const index = this.selectedReactions.indexOf(reactionId);
        if (index === -1) {
          this.selectedReactions.push(reactionId);
        } else {
          this.selectedReactions.splice(index, 1);
        }
  
        // Save selected reactions to local storage
        localStorage.setItem('selectedReactions', JSON.stringify(this.selectedReactions));
      },
      async getForm(){
  
        try {
          const data = {
            id: this.$route.params.id,
            s: this.$route.params.s
          };
  
          
          const response = await axios.post('form', data);
          // console.log(response.data.dosen);
          this.form  = response.data.data ;
          this.dosen  = response.data.dosen ;
        } catch (error) {
          
        } finally {
          this.loadingData = false;
        }
  
      },
      async submitRating() {
        this.loading = true;
        this.validationErrors = {};
  
        const data = {
          form : this.$route.params.id,
          dosen : this.dosen.id,
          Rating: this.selectedRating,
          Komentar: this.comment,
          Reaksi: this.selectedReactions
        };
  
  
        // console.log(this.selectedReactions);
        try {
          const response = await axios.post('ratings', data);
          // console.log(response);
          if(response.status===201){
            this.selectedRating= 0
            this.comment=""
            this.selectedReactions=[]
            this.submitted = true
          }
        } catch (error) {
          console.error(error.response.data.errors);
          if (error.response.status === 422) {
            this.validationErrors = error.response.data.errors;
          } else {
            // Handle other errors
          }
        } finally {
          this.loading = false;
        }
      },
    },
    mounted() {
      this.getForm();
    },
  };
  </script>
  
  <style scoped>
  .text-center {
    text-align: center;
  }
  
  .product-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .rating {
    font-size: 24px;
    cursor: pointer;
  }
  
  .rating span {
    margin-right: 5px;
  }
  
  .rating .filled {
    color: gold;
  }
  
  .product-image {
    width: 100px;
    margin-bottom: 10px;
  }
  
  .reaction-options label {
    display: inline-block;
    margin: 5px;
    cursor: pointer;
    padding: 5px;
    border: 1px solid #000;
  }
  
  .hidden-checkbox {
    display: none;
  }
  
  .reaction-options label.selected {
    color: #fff;
    background-color: #007bff;
  }
  
  /* Additional Bootstrap 5 styles */
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
  
  .btn-primary:disabled {
    background-color: #b3d7ff;
    border-color: #b3d7ff;
  }
  
  ul{
    list-style: none !important;
  }
  </style>
  