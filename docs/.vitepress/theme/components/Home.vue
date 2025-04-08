<template>
    <div class="home">
      <header class="hero">
        <h1 class="title">欢迎来到我的博客</h1>
        <p class="description">在这里，你可以找到关于前端开发的一切知识。</p>
      </header>
  
      <Features></Features>
      
    </div>
</template>
  
<script setup>
import Features from './Features.vue';
</script>
  
<style scoped>
.home {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding-bottom: 2rem;
}

.title {
  font-size: 2.5rem;
  color: #333;
}

.description {
  font-size: 1.25rem;
  color: #666;
}

.content h2 {
  margin-top: 2rem;
  font-size: 1.75rem;
  color: #333;
}
  </style>