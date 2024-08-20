<script setup lang="ts">
import PostSummary from '@/entity/post/PostSummary';

const props = defineProps<{
  post: PostSummary
}>()
</script>

<template>
  <!-- <li class="list-group-item d-flex" > -->
    <div class="col-2">{{ props.post?.id }}</div>
    <div class="col-2">{{ props.post?.categoryName }}</div>
    <div class="col-4"><RouterLink :to="{ name: 'PostDetail', params: { postId: props.post?.id}}">{{ props.post?.getShortenTitle() }}</RouterLink></div>
    <div class="col-2">{{ props.post?.regDate }}</div>
    <div class="col-2">{{ props.post?.views }}</div>
  <!-- </li> -->
</template>