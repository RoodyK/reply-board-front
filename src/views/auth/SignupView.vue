<template>
  <div class="container card-center">
    <div class="card shadow signup">
      <div class="card-body">
        <h5 class="card-title text-center">회원가입</h5>
        <form @submit.prevent>
            <div class="mb-3">
              <label for="email" class="form-label">이메일</label>
              <div class="input-group">
                <input type="email" class="form-control form-control-lg" id="email" placeholder="이메일을 입력하세요" required>
                <button class="btn btn-custom text-white" type="button">중복검사</button>
              </div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">비밀번호</label>
              <input type="password" class="form-control form-control-lg" id="password" placeholder="비밀번호를 입력하세요" required>
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">비밀번호 확인</label>
              <input type="password" class="form-control form-control-lg" id="confirmPassword" placeholder="비밀번호를 다시 입력하세요" required>
            </div>
            <div class="mb-3">
              <label for="name" class="form-label">이름</label>
              <input type="text" class="form-control form-control-lg" id="name" placeholder="이름을 입력하세요" required>
            </div>
            <div class="d-grid">
              <button class="btn btn-custom btn-lg mt-3 text-white" type="button">가입하기</button>
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