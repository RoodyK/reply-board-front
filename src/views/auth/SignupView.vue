<script setup lang="ts">
import MemberCreate from '@/entity/member/MemberCreate';
import type HttpError from '@/http/HttpError';
import type HttpResponse from '@/http/HttpResponse';
import AuthRepository from '@/repository/AuthRepository';
import Toast from '@/util/CustomToast';
import { container } from 'tsyringe';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const toast = container.resolve(Toast);
const authRepository = container.resolve(AuthRepository);
const router = useRouter();

const state = reactive({
  memberCreate: new MemberCreate()
})

const signup = function() {
  if (!validation(state.memberCreate)) {
    return;
  }

  authRepository.signup(state.memberCreate)
  .then((response: HttpResponse) => {
    if (response.getResult()) {
      router.replace("/")
    }
  })
  .catch((e: HttpError) => {
    if (!e.getResult() && e.getCode() == 5000) {
      toast.showToast("중복된 이메일이 존재합니다.")
      return;
    }
  })
}

const validation = function(request: MemberCreate) {
  if (!request.email) {
    toast.showToast("이메일을 입력하세요.")
    return false;
  }

  if (!request.password) {
    toast.showToast("비밀번호를 입력하세요.")
    return false;
  }

  if (request.password.length < 4) {
    toast.showToast("비밀번호는 4자 이상 입력하세요.")
    return false;
  }

  if (!request.passwordConfirm) {
    toast.showToast("비밀번호확인을 입력하세요.")
    return false;
  }

  if (request.passwordConfirm.length < 4) {
    toast.showToast("비밀번호확인은 4자 이상 입력하세요.")
    return false;
  }

  if (request.password != request.passwordConfirm) {
    toast.showToast("비밀번호와 비밀번호 확인이 일치하지 않습니다.")
    return false;
  }

  if (!request.name) {
    toast.showToast("이름을 입력하세요.")
    return false;
  }

  return true;
}

</script>

<template>
  <div class="container card-center">
    <div class="card shadow signup">
      <div class="card-body">
        <h5 class="card-title text-center">회원가입</h5>
        <form @submit.prevent>
            <div class="mb-3">
              <label for="email" class="form-label">이메일</label>
              <div class="input-group">
                <input type="email" v-model="state.memberCreate.email" class="form-control form-control-lg" id="email" maxlength="40" placeholder="이메일을 입력하세요" required>
                <!-- <button class="btn btn-custom text-white" type="button">중복검사</button> -->
              </div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">비밀번호</label>
              <input type="password" v-model="state.memberCreate.password" autocomplete="off" class="form-control form-control-lg" id="password" placeholder="비밀번호를 입력하세요" required>
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">비밀번호 확인</label>
              <input type="password" v-model="state.memberCreate.passwordConfirm" autocomplete="off" class="form-control form-control-lg" id="confirmPassword" placeholder="비밀번호를 다시 입력하세요" required>
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">이름</label>
              <input type="text" v-model="state.memberCreate.name" class="form-control form-control-lg" id="name" placeholder="이름을 입력하세요" required>
            </div>
            <div class="d-grid">
              <button class="btn btn-custom btn-lg mt-3 text-white" type="button" @click="signup">가입하기</button>
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
  .card-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .signup {
    margin-top: 100px;
  }
  .card {
      min-width: 500px;
  }
  .btn-custom {
    background-color: #c2b5fc;
    border-color: #c2b5fc;
  }
</style>