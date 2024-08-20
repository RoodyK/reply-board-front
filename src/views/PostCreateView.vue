<script setup lang="ts">
import PostCreate from '@/entity/post/PostCreate';
import HttpError from '@/http/HttpError';
import PostRepository from '@/repository/PostRepository';
import Toast from '@/util/CustomToast';
import { container } from 'tsyringe';
import { onMounted, reactive } from 'vue';
import CategoryRepository from '../repository/CategoryRepository';
import type HttpResponse from '@/http/HttpResponse';
import Category from '@/entity/category/Category';
import { useRouter } from 'vue-router';

const toast = container.resolve(Toast);
const router = useRouter();

const categoryRepository = container.resolve(CategoryRepository);
const postRepository = container.resolve(PostRepository);

const categoryList = function() {
  categoryRepository.getCategoryList()
  .then((response) => {
    state.postCreate.categoryId = response[0].id
    state.categoryList = response;
  })
  .catch((e:HttpError) => {
    toast.showToast(e.getMessage())
  })
}

onMounted(() => {
  categoryList();
})


type StateType = {
  postCreate: PostCreate
  categoryList: Category[]
}

const state = reactive<StateType>({
  postCreate: new PostCreate(),
  categoryList: []
})

const doCreate = function() {
  if (!validation(state.postCreate)) {
    return;
  }

  postRepository.createPost(state.postCreate)
  .then(response => {
    console.log(response);
    router.replace("/")
  })
  .catch((e: HttpError) => {
    toast.showToast(e.getMessage());
  })
}

const validation = function(postCreate: PostCreate) {
  console.log(postCreate)

  if (!postCreate.title) {
    toast.showToast("제목을 입력해주세요.");
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
  <!-- Main Content -->
  <main class="container mt-5">
    <div class="card">
      <div class="card-header">
        게시글 작성
      </div>
      <div class="card-body">
        <form @submit.prevent>
          <div class="mb-3">
              <label for="category" class="form-label">카테고리</label>
                <select class="form-select" id="category" v-model="state.postCreate.categoryId">
                    <option v-for="category in state.categoryList" :key="category.id" :value="category.id">{{ category.name }}</option>
                </select>
            </div>
          <div class="mb-3">
            <label for="title" class="form-label">제목</label>
            <input type="text" v-model="state.postCreate.title" class="form-control" id="title" placeholder="제목을 입력하세요">
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">내용</label>
            <textarea class="form-control" v-model="state.postCreate.content" id="content" rows="15" placeholder="내용을 입력하세요"></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label">공개 여부</label>
            <div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" v-model="state.postCreate.postStatus" type="radio" name="visibility" id="public" value="PUBLIC" checked>
                <label class="form-check-label" for="public">공개</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" v-model="state.postCreate.postStatus" type="radio" name="visibility" id="private" value="PRIVATE">
                <label class="form-check-label" for="private">비공개</label>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-primary me-2" @click="doCreate()">글 생성</button>
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