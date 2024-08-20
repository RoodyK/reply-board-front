<script setup lang="ts">
import { container } from 'tsyringe';
import { RouterLink } from 'vue-router';
import MemberRepository from '@/repository/MemberRepository';
import { onBeforeMount, onMounted, reactive } from 'vue';
import ProfileRepository from '@/repository/ProfileRepository';
import MemberProfile from '@/entity/member/MemberProfile';

const memberRepository = container.resolve(MemberRepository);
const profileRepository = container.resolve(ProfileRepository);

type StateType = {
  profile: MemberProfile | null
}

const state = reactive<StateType>({
  profile: null
})

onBeforeMount(() => {
  memberRepository.getProfile()
  .then((response: MemberProfile | null) => {
    if (response != null) {
      profileRepository.setProfile(response);
      state.profile = response
    } else {
      profileRepository.clear();
    }
  })
})

const doLogout = function() {
  profileRepository.clear();
  location.href = "/api/v1/auth/logout"
}
</script>

<template>
  <header class="bg-light py-3">
    <div class="container d-flex justify-content-between align-items-center">
      <a href="/" class="navbar-brand navbar">ReplyBoard</a>
      <div class="d-flex">
        <div v-if="state.profile === null">
          <RouterLink to="/auth/login" class="btn btn-primary me-2">로그인</RouterLink>
        </div>
        <div v-if="state.profile !== null">
          <a href="#" @click.prevent="doLogout()" class="btn btn-primary me-2">로그아웃</a>
        </div>
        <div v-if="state.profile === null">
          <RouterLink to="/auth/signup" class="btn btn-primary me-2">회원가입</RouterLink>
        </div>
        <!-- <div v-if="state.profile !== null">
          <RouterLink to="/category/post" class="btn btn-primary">마이페이지</RouterLink>
        </div> -->
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