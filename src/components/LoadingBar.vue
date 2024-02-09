<template>
    <div class="loading-dots">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style>
  .loading-dots {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dot {
    width: 10px;
    height: 10px;
    background-color: #3498db; /* Warna titik */
    border-radius: 50%;
    margin: 0 5px;
    animation: bounce 1.5s infinite; /* Animasi bounce */
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-15px); /* Jarak vertikal maksimum saat memantul */
    }
    60% {
      transform: translateY(-7px); /* Jarak vertikal setelah memantul */
    }
  }
  </style>
  