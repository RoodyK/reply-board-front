<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <header class="bg-light py-3">
    <div class="container d-flex justify-content-between align-items-center">
      <RouterLink to="/" class="navbar-brand navbar">ReplyBoard</RouterLink>
      <div>
        <RouterLink to="/auth/login" class="btn btn-primary me-2">로그인</RouterLink>
        <RouterLink to="/post/detail" class="btn btn-primary me-2">로그아웃</RouterLink>
        <RouterLink to="/auth/signup" class="btn btn-primary me-2">회원가입</RouterLink>
        <RouterLink to="/category/post" class="btn btn-primary">마이페이지</RouterLink>
      </div>
    </div>
  </header>
</template>

<style>
  .btn:hover {
    background-color: #b6a6fc;
    border-color: #b6a6fc;
  }
</style>