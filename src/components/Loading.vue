<template>
    <div class="loading-spinner">
      <div class="spinner"></div>
    </div>
</template>
  
  <style>
  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px; /* Atur tinggi sesuai kebutuhan */
  }
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #007bff; /* Warna border untuk membuat efek spin */
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite; /* Animasi spin */
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  