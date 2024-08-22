<script setup lang="ts">
import CommentCreate from '@/entity/comment/CommentCreate';
import HttpResponse from '@/http/HttpResponse';
import CommentRepository from '@/repository/CommentRepository';
import Toast from '@/util/CustomToast';
import { container } from 'tsyringe';
import { reactive } from 'vue';

const commentRepository = container.resolve(CommentRepository);
const toast = container.resolve(Toast);

const props = defineProps<{
  postId: number
}>()

const emit = defineEmits<{
  (e: 'getCommentList'): void
}>()

type StateType = {
  commentCreate: CommentCreate
}

const state = reactive<StateType>({
  commentCreate: new CommentCreate()
})

const commentWrite = function() {
  if (!validation(state.commentCreate)) {
    return;
  }

  commentRepository.addComment(props.postId, state.commentCreate)
  .then((response: HttpResponse) => {
    if (response.getResult()) {
      toast.showToast("댓글을 등록했습니다.");
      state.commentCreate.author = ""
      state.commentCreate.password = ""
      state.commentCreate.content = ""
      emit('getCommentList');
    }
  })
  .catch(() => {
    toast.showToast("댓글을 등록에 실패했습니다. ");
  })
}

const validation = function(postCreate: CommentCreate) {
  console.log(postCreate)

  if (!postCreate.author) {
    toast.showToast("작성자명을 입력해주세요.");
    return false;
  }

  if (!postCreate.password) {
    toast.showToast("비밀번호를 입력해주세요.");
    return false;
  }

  if (!postCreate.content) {
    toast.showToast("내용을 입력해주세요.");
    return false;
  }

  return true;
}
</script>

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
              <input type="text" v-model="state.commentCreate.author" class="form-control" maxlength="20" id="commentAuthor" placeholder="작성자 이름">
            </div>
            <div class="col">
              <label for="commentPassword" class="form-label">비밀번호</label>
              <input type="password" v-model="state.commentCreate.password" autocomplete="off" maxlength="40" class="form-control" id="commentPassword" placeholder="비밀번호">
            </div>
          </div>
          <div class="mb-3">
            <label for="commentContent" class="form-label">내용</label>
            <textarea class="form-control comment-content" v-model="state.commentCreate.content" id="commentContent" rows="3" placeholder="댓글 내용을 입력하세요"></textarea>
          </div>
          <div class="comment-footer">
            <button type="button" class="btn btn-primary" @click="commentWrite">댓글 작성</button>
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
  .comment-content {
    resize: none;
  }
</style>