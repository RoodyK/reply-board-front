<template>
  <!-- 댓글 작성 폼 -->
  <div class="container my-5">
    <div class="card">
      <div class="card-header board-header">
        댓글 작성
      </div>
      <div class="card-body">
        <form>
          <div class="mb-3 row">
            <div class="col">
              <label for="commentAuthor" class="form-label">작성자</label>
              <input type="text" class="form-control" id="commentAuthor" placeholder="작성자 이름">
            </div>
            <div class="col">
              <label for="commentPassword" class="form-label">비밀번호</label>
              <input type="password" autocomplete="off" class="form-control" id="commentPassword" placeholder="비밀번호">
            </div>
          </div>
          <div class="mb-3">
            <label for="commentContent" class="form-label">내용</label>
            <textarea class="form-control" id="commentContent" rows="3" placeholder="댓글 내용을 입력하세요"></textarea>
          </div>
          <div class="comment-footer">
            <button type="button" class="btn btn-primary">댓글 작성</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
    .comment-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
</style>