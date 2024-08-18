<template>
  <div class="container card-center">
    <div class="card shadow login">
      <div class="card-body">
        <h5 class="card-title text-center">ReplyBoard - 로그인</h5>
        <form @submit.prevent>
            <div class="mb-3">
              <label for="email" class="form-label">이메일</label>
              <input type="email" class="form-control form-control-lg" id="email" placeholder="이메일을 입력하세요">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">비밀번호</label>
              <input type="password" class="form-control form-control-lg" id="password" placeholder="비밀번호를 입력하세요">
            </div>
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-custom btn-lg text-white">로그인</button>
            </div>
            <div class="mt-3 text-center">
              <a href="#" class="text-muted">아이디 찾기</a> | <a href="#" class="text-muted">비밀번호 찾기</a>
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
  .btn-custom {
    background-color: #c2b5fc;
    border-color: #c2b5fc;
  }
  .card-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>