<script setup lang="ts">
import CommentRepository from '@/repository/CommentRepository';
import { container } from 'tsyringe';
import { onMounted, reactive, ref } from 'vue';
import Comment from '@/entity/comment/Comment';
import { Modal } from 'bootstrap';
import CommentCreate from '@/entity/comment/CommentCreate';
import CommentEdit from '@/entity/comment/CommentEdit';
import CommentRemove from '@/entity/comment/CommentRemove';
import Toast from '@/util/CustomToast';

const toast = container.resolve(Toast);
const commentRepository = container.resolve(CommentRepository);

const props = defineProps<{
  postId: number
  commentList: Comment[]
}>()

const emit = defineEmits<{
  (e: 'getCommentList'): void
}>()

type StateType = {
  commentId: number
  replyCreate: CommentCreate
  commentEdit: CommentEdit
  commentRemove: CommentRemove
}

const state = reactive<StateType>({
  commentId: 0,
  replyCreate: new CommentCreate(),
  commentEdit: new CommentEdit(),
  commentRemove: new CommentRemove()
})

const replyModalRef = ref<HTMLElement | null>(null);
const editModalRef = ref<HTMLElement | null>(null);
const removeModalRef = ref<HTMLElement | null>(null);

// 모달 인스턴스
let replyModal: Modal | null = null;
let editModal: Modal | null = null;
let removeModal: Modal | null = null

const openReplyModal = function(commentId: number) {
  state.commentId = commentId;
  if (replyModal) {
    replyModal.show();
  }
};

const openEditModal = function(commentId: number) {
  state.commentId = commentId;
  if (editModal) {
    editModal.show();
  }
};

const openRemoveModal = function(commentId: number) {
  state.commentId = commentId;
  if (removeModal) {
    removeModal.show();
  }
}

const closeReplyModal = () => {
  console.log("commentId >>> ", state.commentId);
  if (replyModal) {
    replyModal.hide();
  }

  state.commentId = 0;
  state.replyCreate.author = "";
  state.replyCreate.password = "";
  state.replyCreate.content = "";
};

const closeEditModal = () => {
  console.log("commentId >>> ", state.commentId);
  if (editModal) {
    editModal.hide();
  }

  state.commentId = 0;
  state.commentEdit.password = "";
  state.commentEdit.content = "";
};

const closeRemoveModal = () => {
  console.log("commentId >>> ", state.commentId);
  if (removeModal) {
    removeModal.hide();
  }

  state.commentId = 0;
  state.commentRemove.password = "";
};

onMounted(() => {
  if (replyModalRef.value) {
    replyModal = new Modal(replyModalRef.value);
  }
  if (editModalRef.value) {
    editModal = new Modal(editModalRef.value);
  }
  if (removeModalRef.value) {
    removeModal = new Modal(removeModalRef.value);
  }
});

const addReply = function() {
  console.log(state.replyCreate);

  commentRepository.addReply(props.postId, state.commentId, state.replyCreate)
  .then(() => {
    toast.showToast("댓글을 등록했습니다.");
    closeReplyModal();
    callCommentList();
  })
  .catch(() => {
    toast.showToast("댓글을 등록에 실패했습니다.");
    closeReplyModal();
  })
}

const editComment = function() {
  console.log(state.commentEdit);

  commentRepository.editCommnet(props.postId, state.commentId, state.commentEdit)
  .then(() => {
    toast.showToast("댓글을 수정했습니다..");
    closeEditModal();
    callCommentList();
  })
  .catch(() => {
    toast.showToast("댓글을 수정에 실패했습니다.");
    closeEditModal();
  })
}

const removeComment = function() {
  console.log(state.commentRemove);
  
  commentRepository.removeComment(props.postId, state.commentId, state.commentRemove)
  .then(() => {
    toast.showToast("댓글을 삭제했습니다..");
    closeRemoveModal();
    callCommentList();
  })
  .catch(() => {
    toast.showToast("댓글을 삭제에 실패했습니다.");
    closeRemoveModal();
  })
}

const callCommentList = function() {
  emit('getCommentList');
}
</script>

<template>
  <!-- 댓글 및 답글 목록 -->
  <div class="container my-5">
    <div class="comment-group" v-for="comment in props.commentList" :key="comment.id">
      <!-- 댓글 -->
      <div class="card mb-3 comment-card">
        <div class="card-body">
          <h5 class="card-title">{{ comment.author }}</h5>
          <p class="card-text">{{ comment.content }}</p>
          <div class="comment-footer">
            <!-- <button type="button" class="btn btn-primary" @click="openModal(comment.id)">답글 달기</button> -->
            <button type="button" class="btn btn-primary" @click="openReplyModal(comment.id)">답글 달기</button>
            <button type="button" class="btn btn-primary" @click="openEditModal(comment.id)">수정</button>
            <button type="button" class="btn btn-primary" @click="openRemoveModal(comment.id)">삭제</button>
          </div>
        </div>
      </div>
      
      <!-- 답글 -->
      <div class="card mb-3 reply-card" v-for="reply in comment.replies" :key="reply.id">
        <div class="card-body">
          <h5 class="card-title">{{ reply.author }}</h5>
          <p class="card-text">{{ reply.content }}</p>
          <div class="comment-footer">
            <button type="button" class="btn btn-primary" @click="openEditModal(reply.id)">수정</button>
            <button type="button" class="btn btn-primary" @click="openRemoveModal(reply.id)">삭제</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 추가 댓글 및 답글 -->
  </div>

  <!-- Reply Modal -->
  <div class="modal fade" ref="replyModalRef" id="replyModal" tabindex="-1" aria-labelledby="replyModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="replyModalLabel">답글 달기</h5>
          <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
        </div>
        <div class="modal-body">
          <div class="card">
            <div class="card-body">
              <form>
                <div class="mb-3 row">
                  <div class="col">
                    <label for="replyAuthor" class="form-label">작성자</label>
                    <input type="text" v-model="state.replyCreate.author" class="form-control" id="replyAuthor" placeholder="작성자 이름">
                  </div>
                  <div class="col">
                    <label for="replyPassword" class="form-label">비밀번호</label>
                    <input type="password" v-model="state.replyCreate.password" autocomplete="off" class="form-control" id="replyPassword" placeholder="비밀번호">
                  </div>
                </div>
                <div class="mb-3">
                  <label for="replyContent" class="form-label">내용</label>
                  <textarea class="form-control" v-model="state.replyCreate.content" id="replyContent" rows="3" placeholder="답글 내용을 입력하세요"></textarea>
                </div>
                <div class="d-flex justify-content-end">
                  <button type="button" class="btn btn-primary me-3" @click="closeReplyModal">취소</button>
                  <button type="button" class="btn btn-primary" @click="addReply">작성</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Modal -->
  <div class="modal fade" ref="editModalRef" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editModalLabel">댓글 수정</h5>
        </div>
        <div class="modal-body">
          <div class="card">
            <div class="card-body">
              <form>
                <div class="mb-3 row">
                  <div class="col">
                    <label for="editPassword" class="form-label">비밀번호</label>
                    <input type="password" v-model="state.commentEdit.password" autocomplete="off" class="form-control" id="editPassword" placeholder="비밀번호">
                  </div>
                </div>
                <div class="mb-3">
                  <label for="editContent" class="form-label">내용</label>
                  <textarea class="form-control" v-model="state.commentEdit.content" id="editContent" rows="3" placeholder="댓글 내용을 입력하세요"></textarea>
                </div>
                <div class="d-flex justify-content-end">
                  <button type="button" class="btn btn-primary me-3" @click="closeEditModal">취소</button>
                  <button type="button" class="btn btn-primary" @click="editComment">수정</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- Remove Modal -->
  <div class="modal fade" ref="removeModalRef" id="removeModal" tabindex="-1" aria-labelledby="removeModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="removeModalLabel">댓글 삭제</h5>
        </div>
        <div class="modal-body">
          <div class="card">
            <div class="card-body">
              <form>
                <div class="mb-3 row">
                  <div class="col">
                    <label for="removePassword" class="form-label">비밀번호</label>
                    <input type="password" v-model="state.commentRemove.password" autocomplete="off" class="form-control" id="removePassword" placeholder="비밀번호">
                  </div>
                </div>
                <div class="d-flex justify-content-end">
                  <button type="button" class="btn btn-primary me-3" @click="closeRemoveModal">취소</button>
                  <button type="button" class="btn btn-primary" @click="removeComment">삭제</button>
                </div>
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
      background-color: #fefdfe;
    }
    .reply-card {
      background-color: #f3f0fd;
    }
    .comment-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
</style>