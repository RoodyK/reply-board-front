<script setup>
</script>


<template>
  <!-- Header -->

  <!-- Main Content -->
  <main class="container mt-5">
      <div class="card">
          <div class="card-header">
              게시글 작성
          </div>
          <div class="card-body">
              <form>
                  <div class="mb-3">
                      <label for="title" class="form-label">제목</label>
                      <input type="text" class="form-control" id="title" placeholder="제목을 입력하세요">
                  </div>
                  <div class="mb-3">
                      <label for="content" class="form-label">내용</label>
                      <textarea class="form-control" id="content" rows="15" placeholder="내용을 입력하세요"></textarea>
                  </div>
                  <div class="mb-3">
                      <label class="form-label">공개 여부</label>
                      <div>
                          <div class="form-check form-check-inline">
                              <input class="form-check-input" type="radio" name="visibility" id="public" value="public" checked>
                              <label class="form-check-label" for="public">공개</label>
                          </div>
                          <div class="form-check form-check-inline">
                              <input class="form-check-input" type="radio" name="visibility" id="private" value="private">
                              <label class="form-check-label" for="private">비공개</label>
                          </div>
                      </div>
                  </div>
                  <div class="d-flex justify-content-end">
                      <button type="submit" class="btn btn-primary me-2">글 생성</button>
                      <button type="reset" class="btn btn-primary">취소</button>
                  </div>
              </form>
          </div>
      </div>
  </main>


</template>

<style scoped>
    body {
      padding-top: 70px; /* 헤더 높이만큼 상단 패딩 추가 */
      padding-bottom: 70px; /* 푸터 높이만큼 하단 패딩 추가 */
    }
    .board-header {
      font-weight: bold;
      background-color: #D1C4E9; /* 밝은 보라색 */
    }
    .btn-primary, .btn-secondary, .btn-info {
      background-color: #D1C4E9;
      border-color: #D1C4E9;
    }
    .btn-primary:hover {
        background-color: #B39DDB;
        border-color: #B39DDB;
    }
    .nav-pills .nav-link.active {
      background-color: #D1C4E9;
    }
    header, footer {
      position: fixed;
      width: 100%;
      z-index: 1000;
    }
    header {
      top: 0;
    }
    footer {
      bottom: 0;
    }
</style>