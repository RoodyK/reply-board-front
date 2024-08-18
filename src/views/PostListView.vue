<script lang="ts" setup></script>

<template>
  <div class="mb-4">
    <ul class="nav nav-pills justify-content-center">
      <li class="nav-item">
        <RouterLink class="nav-link active" to="">일상</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="">운동</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="">요리</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="">게임</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="">여행</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="">스터디</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="">기타</RouterLink>
      </li>
    </ul>
  </div>

  <div>
    <div class="d-flex justify-content-between mb-3">
      <button href="#" class="btn btn-primary">글 등록</button>
      <div class="d-flex">
        <input class="form-control me-2" type="text" placeholder="검색">
        <button class="btn btn-primary search" type="button">검색</button>
      </div>
    </div>
  </div>

  <div class="post">
    <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center board-header">
        <div class="col-md-1">글번호</div>
        <div class="col-md-2">카테고리</div>
        <div class="col-md-4">제목</div>
        <div class="col-md-2">작성일</div>
        <div class="col-md-1">조회수</div>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div class="col-md-1">1</div>
        <div class="col-md-2">여행</div>
        <div class="col-md-4">첫 번째 글</div>
        <div class="col-md-2">2023-10-01</div>
        <div class="col-md-1">100</div>
      </li>
    <!-- 추가적인 게시글 항목은 필요에 따라 추가 -->
    </ul>
  </div>

  <!-- Pagination -->
  <nav aria-label="Page navigation" class="mt-4">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&lt;</span>
        </a>
      </li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item"><a class="page-link" href="#">4</a></li>
      <li class="page-item"><a class="page-link" href="#">5</a></li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&gt;</span>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
  .nav-item {
    margin-right: 2px;
  }
  .nav-item:last-child {
    margin-right: 0;
  }
  .search {
    width: 100px;
  }
</style>