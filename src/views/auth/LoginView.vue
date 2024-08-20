<script setup lang="ts">
import Login from '@/entity/auth/Login';
import { reactive } from 'vue';
import Toast from '@/util/CustomToast'
import type HttpError from '@/http/HttpError';
import { container } from 'tsyringe';
import MemberRepository from '@/repository/MemberRepository';

const state = reactive({
  login: new Login()
});

const toast = container.resolve(Toast);

const memberRepository = container.resolve(MemberRepository);

const doLogin = function() {
  memberRepository.login(state.login)
  .then(response => {
    console.log(response);
    location.href = "/";
  })
  .catch((e: HttpError) => {
    toast.showToast(e.getMessage())
  })
}

</script>

<template>
  <div class="container card-center">
    <div class="card shadow login">
      <div class="card-body">
        <h5 class="card-title text-center">ReplyBoard - 로그인</h5>
        <form @submit.prevent>
            <div class="mb-3">
              <label for="email" class="form-label">이메일</label>
              <input type="input" maxlength="40" v-model="state.login.email" class="form-control form-control-lg" id="email" placeholder="이메일을 입력하세요">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">비밀번호</label>
              <input type="password" autoComplete="off" maxlength="20" v-model="state.login.password" class="form-control form-control-lg" id="password" placeholder="비밀번호를 입력하세요">
            </div>
            <div class="d-grid gap-2 mt-5">
              <button type="button" class="btn btn-primary btn-lg text-white" @click="doLogin()">로그인</button>
            </div>
            <div class="mt-3 text-center">
              <!-- <a href="#" class="text-muted">아이디 찾기</a> | <a href="#" class="text-muted">비밀번호 찾기</a> -->
            </div>
        </form>
      </div>
    </div>
  </div>

</template>

<style scoped>
  body, html {
    height: 100%;
  }
  .login {
    margin-top: 150px;
    width: 450px
  }
  .card-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>