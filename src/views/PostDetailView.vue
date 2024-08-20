<script setup lang="ts">
import CommentWrite from '@/components/comment/CommentWirte.vue'
import { onBeforeMount, reactive } from 'vue';
import PostRepository from '../repository/PostRepository';
import { container } from 'tsyringe';
import Post from '@/entity/post/Post';
import PostDetail from '@/components/post/PostDetail.vue'

const postRepository = container.resolve(PostRepository);

type StateType = {
  post: Post
}

const props = defineProps<{
  postId: number
}>()

const state = reactive<StateType>({
  post: new Post()
})

const getPost = function() {
  postRepository.getPost(props.postId)
  .then((response: Post) => {
    console.log(response)
    state.post = response;
  })
}

onBeforeMount(() => {
  getPost();
})
</script>


<template>
  <!-- 게시판 상세 내용 -->
  <PostDetail :post="state.post"/>

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
                    <input type="password" autocomplete="off" class="form-control" id="replyPassword" placeholder="비밀번호">
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
                    <input type="password" autocomplete="off" class="form-control" id="editPassword" placeholder="비밀번호">
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