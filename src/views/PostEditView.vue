<script setup lang="ts">
import HttpError from '@/http/HttpError';
import PostRepository from '@/repository/PostRepository';
import Toast from '@/util/CustomToast';
import { container } from 'tsyringe';
import { onMounted, reactive } from 'vue';
import CategoryRepository from '../repository/CategoryRepository';
import Category from '@/entity/category/Category';
import { useRouter } from 'vue-router';
import PostEdit from '@/entity/post/PostEdit';

const toast = container.resolve(Toast);
const router = useRouter();

const categoryRepository = container.resolve(CategoryRepository);
const postRepository = container.resolve(PostRepository);

const props = defineProps<{
  postId: number
}>()

type StateType = {
  postEdit: PostEdit
  categoryList: Category[]
}

const state = reactive<StateType>({
  postEdit: new PostEdit(),
  categoryList: []
})

const doEdit = function() {
  if (!validation(state.postEdit)) {
    return;
  }

  postRepository.editPost(state.postEdit)
  .then(response => {
    if (response.result) {
      toast.showToast("게시글이 수정되었습니다.");
      router.push({ name: 'PostDetail', params: { postId: props.postId }});
    }
  })
  .catch((e: HttpError) => {
    toast.showToast(e.getMessage());
  })
}

const validation = function(postEdit: PostEdit) {
  if (!postEdit.title) {
    toast.showToast("제목을 입력해주세요.");
    return false;
  }

  if (!postEdit.content) {
    toast.showToast("내용을 입력해주세요.");
    return false;
  }

  return true;
}

const getPost = function() {
  postRepository.getPostByEdit(props.postId)
  .then((response: PostEdit) => {
    console.log(response)
    state.postEdit = response;
  })
}

const categoryList = function() {
  categoryRepository.getCategoryList()
  .then((response) => {
    state.categoryList = response;
  })
  .catch((e:HttpError) => {
    toast.showToast(e.getMessage())
  })
}

onMounted(() => {
  getPost();
  categoryList();
})
</script>


<template>
  <!-- Main Content -->
  <main class="container mt-5">
    <div class="card">
      <div class="card-header">
        게시글 수정
      </div>
      <div class="card-body">
        <form @submit.prevent>
          <div class="mb-3">
            <label for="category" class="form-label">카테고리</label>
            <select class="form-select" id="category" v-model="state.postEdit.categoryId">
                <option v-for="category in state.categoryList" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">제목</label>
            <input type="text" v-model="state.postEdit.title" class="form-control" id="title" placeholder="제목을 입력하세요">
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">내용</label>
            <textarea class="form-control" v-model="state.postEdit.content" id="content" rows="15" placeholder="내용을 입력하세요"></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label">공개 여부</label>
            <div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" v-model="state.postEdit.postStatus" type="radio" name="visibility" id="public" value="PUBLIC" checked>
                <label class="form-check-label" for="public">공개</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" v-model="state.postEdit.postStatus" type="radio" name="visibility" id="private" value="PRIVATE">
                <label class="form-check-label" for="private">비공개</label>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-primary me-2" @click="doEdit()">수정</button>
            <button type="button" class="btn btn-primary">취소</button>
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
    textarea {
      resize: none
    }
</style>