<script setup lang="ts">
import CommentWrite from '@/components/comment/CommentWirte.vue'
import PostDetail from '@/components/post/PostDetail.vue'
import CommentList from '@/components/comment/CommentList.vue'
import { onBeforeMount, reactive } from 'vue';
import PostRepository from '../repository/PostRepository';
import { container } from 'tsyringe';
import Post from '@/entity/post/Post';
import CommentRepository from '@/repository/CommentRepository';
import Comment from '@/entity/comment/Comment';

const postRepository = container.resolve(PostRepository);
const commentRepository = container.resolve(CommentRepository);

const props = defineProps<{
  postId: number
}>()

type StateType = {
  post: Post
  commentList: Comment[]
}

const state = reactive<StateType>({
  post: new Post(),
  commentList: []
})

const getPost = function() {
  postRepository.getPost(props.postId)
  .then((response: Post) => {
    state.post = response;
  })
}

const getCommentList = function() {
  commentRepository.getCommentList(props.postId)
  .then((response) => {
    console.log(response);
    state.commentList = response;
  })
}

onBeforeMount(() => {
  getPost();
  getCommentList();
})

</script>


<template>
  <!-- 게시판 상세 내용 -->
  <PostDetail :post="state.post"/>

  <CommentWrite :postId="props.postId" @getCommentList="getCommentList"/>

  <!-- 댓글 및 답글 목록 -->
  <CommentList :postId="props.postId" :commentList="state.commentList" @getCommentList="getCommentList"/>
</template>

<style scoped>

</style>