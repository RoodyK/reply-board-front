<script setup>
import CommentWrite from '@/components/comment/CommentWirte.vue'
</script>

<template>
  <!-- 게시판 상세 내용 -->
  <div class="container my-5">
    <div class="card">
      <div class="card-header board-header">
        <div class="row">
          <div class="col-4">카테고리명</div>
        </div>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-2">글 번호</div>
          <div class="col-10">글 제목</div>
        </div>
        <div class="row mb-3">
          <div class="col-4">작성자명</div>
          <div class="col-4">등록일 : <span>2023-02-02</span></div>
          <div class="col-4">조회수 : <span>100000</span></div>
        </div>
        <hr>
        <div>
          <p>게시글 내용입니다.</p>
          <p>게시글 내용입니다.</p>
          <p>게시글 내용입니다.</p>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-end mt-3">
        <button type="button" class="btn btn-primary me-2">뒤로가기</button>
        <button type="button" class="btn btn-primary">글 수정</button>
    </div>
  </div>

  <CommentWrite />

  <!-- 댓글 및 답글 목록 -->
  <div class="container my-5">
    <!-- 댓글 -->
    <div class="card mb-3 comment-card">
      <div class="card-body">
        <h5 class="card-title">작성자명</h5>
        <p class="card-text">댓글 내용입니다.</p>
        <div class="comment-footer">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#replyModal">답글 달기</button>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal">수정</button>
          <button type="button" class="btn btn-primary">삭제</button>
        </div>
      </div>
    </div>
    <!-- 답글 -->
    <div class="card mb-3 reply-card">
      <div class="card-body">
        <h5 class="card-title">작성자명</h5>
        <p class="card-text">답글 내용입니다.</p>
        <div class="comment-footer">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal">수정</button>
          <button type="button" class="btn btn-primary">삭제</button>
        </div>
      </div>
    </div>
    <!-- 추가 댓글 및 답글 -->

  </div>

  <!-- Reply Modal -->
  <div class="modal fade" id="replyModal" tabindex="-1" aria-labelledby="replyModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="replyModalLabel">답글 달기</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card">
            <div class="card-body">
              <form>
                <div class="mb-3 row">
                  <div class="col">
                    <label for="replyAuthor" class="form-label">작성자</label>
                    <input type="text" class="form-control" id="replyAuthor" placeholder="작성자 이름">
                  </div>
                  <div class="col">
                    <label for="replyPassword" class="form-label">비밀번호</label>
                    <input type="password" class="form-control" id="replyPassword" placeholder="비밀번호">
                  </div>
                </div>
                <div class="mb-3">
                  <label for="replyContent" class="form-label">내용</label>
                  <textarea class="form-control" id="replyContent" rows="3" placeholder="답글 내용을 입력하세요"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">답글 작성</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Modal -->
  <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editModalLabel">댓글 수정</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card">
            <div class="card-body">
              <form>
                <div class="mb-3 row">
                  <div class="col">
                    <label for="editAuthor" class="form-label">작성자</label>
                    <input type="text" class="form-control" id="editAuthor" placeholder="작성자 이름">
                  </div>
                  <div class="col">
                    <label for="editPassword" class="form-label">비밀번호</label>
                    <input type="password" class="form-control" id="editPassword" placeholder="비밀번호">
                  </div>
                </div>
                <div class="mb-3">
                  <label for="editContent" class="form-label">내용</label>
                  <textarea class="form-control" id="editContent" rows="3" placeholder="댓글 내용을 입력하세요"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">댓글 수정</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
    .comment-card {
      background-color: #fdfcff;
    }
    .reply-card {
      background-color: #f1eefc;
    }
    .comment-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
</style>