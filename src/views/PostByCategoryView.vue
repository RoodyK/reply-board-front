<script setup lang="ts">
import PostSummary from '@/entity/post/PostSummary';
import PostRepository from '@/repository/PostRepository';
import { container } from 'tsyringe';
import { onMounted, reactive, ref, watch } from 'vue';
import PostList from '@/components/post/PostList.vue'
import Paging from '@/entity/Paging';
import ProfileRepository from '@/repository/ProfileRepository';
import PaginationUtil from '@/components/Pagination.vue'
import CategoryRepository from '@/repository/CategoryRepository';
import Toast from '@/util/CustomToast';
import Category from '@/entity/category/Category';

const postRepository = container.resolve(PostRepository);
const profileRepository = container.resolve(ProfileRepository);
const categoryRepository = container.resolve(CategoryRepository);
const toast = container.resolve(Toast);

const props = defineProps<{
  categoryId: number
}>()

const getCategoryList = function() {
  categoryRepository.getCategoryList()
  .then((response) => {
    state.categoryList = response;
  })
  .catch((e) => {
    toast.showToast(e.getMessage())
  })
}

type StateType = {
  postList: Paging<PostSummary>
  categoryList: Category[]
}

const searchValue = ref("");

const state = reactive<StateType>({
  postList: new Paging<PostSummary>,
  categoryList: []
})

const getPostList = function(page = 1) {
  postRepository.getCategoryByPostList(props.categoryId, page, searchValue.value)
  .then((response: Paging<PostSummary>) => {
    state.postList = response;
  })
}

// 특정 페이지로 이동하는 함수
const goToPage = (page: number) => {
  getPostList(page);
};

onMounted(() => {
  getCategoryList()
  getPostList();
})

// 카테고리 변경에 따른 값을 가져오기
watch(() => props.categoryId, () => {
  getPostList();
});

const doSearch = function() {
  getPostList();
}
</script>

<template>
  <div class="mb-4">
    <ul class="nav nav-pills justify-content-center">
      <li class="nav-item" v-for="category in state.categoryList" :key="category.id" :class="{ active: props.categoryId == category.id }">
        <RouterLink :key="$route.fullPath" class="nav-link" :to="{ name: 'PostByCategory', params: { categoryId: category.id } }">{{ category.name }}</RouterLink>
      </li>
    </ul>
  </div>

  <div>
    <div class="d-flex justify-content-end mb-3" v-if="profileRepository.getProfile() != null">
      <RouterLink to="/post/create" class="btn btn-primary create">글 등록</RouterLink>
    </div>
    <div class="d-flex justify-content-between mb-3">
      <div>총 게시글 : {{ state.postList.totalCount }}</div>
      <div class="d-flex">
        <input class="form-control me-2" type="text" v-model="searchValue" placeholder="검색">
        <button class="btn btn-primary search" type="button" @click="doSearch()">검색</button>
      </div>
    </div>
  </div>

  <div class="post">
    <ul class="list-group">
      <li class="list-group-item d-flex board-header">
        <div class="col-2">no</div>
        <div class="col-2">카테고리</div>
        <div class="col-4">제목</div>
        <div class="col-2">작성일</div>
        <div class="col-2">조회수</div>
      </li>
      <li class="list-group-item d-flex" v-for="post in state.postList.items" :key="post.id" >
        <PostList :post="post"/>
      </li>
    </ul>
  </div>

  <!-- Pagination -->
  <PaginationUtil
    :currentPage="state.postList.page"
    :pageSize="state.postList.size"
    :totalCount="state.postList.totalCount"
    @goToPage="goToPage"
  />
</template>

<style scoped>
  .nav-item {
    margin-right: 2px;
    color: #333;
  }
  .nav-item:last-child {
    margin-right: 0;
  }
  .create {
    width: 90px;
  }
  .search {
    width: 120px;
  }
</style>