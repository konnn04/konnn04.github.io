<script>
    import { onMount } from 'svelte';
    
    let visible = true;
    
    onMount(() => {
      setTimeout(() => {
        visible = false;
      }, 3000);
    });
  </script>
  
  {#if visible}
    <div class="loading-screen">
      <div class="loading-container">
        <div class="uwu-icon">UwU</div>
        <div class="loading-spinner"></div>
      </div>
    </div>
  {/if}
  
  <style>
    .loading-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      animation: fadeOut 0.3s ease 0.7s forwards;
    }
    
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      animation: fadeIn 0.5s ease forwards; // Added fadeIn animation
    }
    
    .uwu-icon {
      font-size: 3rem;
      font-weight: 700;
      background: linear-gradient(45deg, #00c4ef, #2e70ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 0 10px rgba(0, 196, 239, 0.5));
      animation: pulse 1s ease-in-out infinite alternate;
      font-family: 'Arial', sans-serif;
      letter-spacing: 0.1rem;
    }
    
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(255, 255, 255, 0.1);
      border-left-color: #00c4ef;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes pulse {
      from {
        transform: scale(0.9);
        opacity: 0.7;
      }
      to {
        transform: scale(1.1);
        opacity: 1;
      }
    }
    
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    
    @keyframes fadeOut {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
        visibility: hidden;
      }
    }
  </style>