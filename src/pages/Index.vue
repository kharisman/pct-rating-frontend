<template>
  <div>
    <!-- Your Carousel -->
    <div v-if="loading" class="mt-4">
      <Loading/>
    </div>
    <div v-else>
      <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
        <!-- Carousel Inner -->
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://palcomtech.ac.id/wp-content/uploads/2024/02/mgm-2024-v2-FIX-WALLPAPER.jpg"
              class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="https://palcomtech.ac.id/wp-content/uploads/2023/10/slider-1-beasiswa-kuliah-di-palcomtech-2024.jpg"
              class="d-block w-100" alt="...">
          </div>
        </div>
        <!-- Carousel Navigation Buttons -->
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleSlidesOnly"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleSlidesOnly"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>

        <!-- Custom Modal -->
        <div v-if="!showModal" class="custom-modal">
          <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h5 class="mb-4">Pendaftaran Ambasador MGM</h5>
            <!-- Form inside the modal -->
            <form @submit.prevent="submitForm">
              <div class="mb-3 form-group">
                <label for="name" class="form-label">Nama Anda:</label>
                <input type="text" class="form-control" id="name" v-model="formData.name" @input="validateName" @blur="validateName">
                <div v-if="nameError" class="text-danger">{{ nameError }}</div>
              </div>
              <div class="mb-3 form-group">
                <label for="phone" class="form-label">Nomor Telepon/Whatsapp:</label>
                <input type="tel" class="form-control" id="phone" v-model="formData.phone" @input="validatePhone" @blur="validatePhone">
                <div v-if="phoneError" class="text-danger">{{ phoneError }}</div>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>

              <div class="alert alert-info mt-3"> <b>Pendaftaran Ambasador MGM ini hanya dilakukan 1 kali saja</b>  </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';

export default {
  components: {
    Loading
  },
  data() {
    return {
      showModal: true,
      formData: {
        name: "",
        phone: ""
      },
      loading: true,
      nameError: "",
      phoneError: ""
    };
  },
  mounted() {
    // Check if data already exists in localStorage
    const savedData = JSON.parse(localStorage.getItem("formData")) || [];
    if (savedData.length > 0) {
      // Data exists, don't show the modal
      this.showModal = false;
    }

    this.loading = false;
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    submitForm() {
      // Validate form fields
      this.validateName();
      this.validatePhone();

      // Check if there are any validation errors
      if (this.nameError || this.phoneError) {
        // If there are errors, do not proceed with submission
        return;
      }

      // Save form data to localStorage
      const savedData = JSON.parse(localStorage.getItem("formData")) || [];
      savedData.push(this.formData);
      localStorage.setItem("formData", JSON.stringify(savedData));

      // Clear form fields after submission
      this.formData.name = "";
      this.formData.phone = "";

      // Close the modal
      this.closeModal();
    },
    validateName() {
      if (this.formData.name.length < 3) {
        this.nameError = "Nama harus minimal 3 karakter";
      } else {
        this.nameError = "";
      }
    },
    validatePhone() {
      const phoneRegex = /^08[0-9]{8,}$/;
      if (!phoneRegex.test(this.formData.phone)) {
        this.phoneError = "Nomor telepon harus dimulai dengan '08' dan minimal 10 digit";
      } else {
        this.phoneError = "";
      }
    }
  }
};
</script>

<style scoped>
.custom-modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 28px;
  font-weight: bold;
  margin-right: 15px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
}

.btn-primary {
  margin-top: 10px;
  cursor: pointer;
}
</style>
