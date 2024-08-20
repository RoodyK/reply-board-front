<script setup lang="ts">
import MemberProfile from '@/entity/member/MemberProfile';
import Post from '@/entity/post/Post';
import PostRepository from '@/repository/PostRepository';
import ProfileRepository from '@/repository/ProfileRepository';
import Toast from '@/util/CustomToast';
import { container } from 'tsyringe';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const postRepository = container.resolve(PostRepository);
const profileRepository = container.resolve(ProfileRepository);
const toast = container.resolve(Toast);

const props = defineProps<{
  post: Post
}>()

type StateType = {
  memberProfile: MemberProfile | null
}

const state = reactive<StateType>({
  memberProfile: null
})

const prevPage = function() {
  router.back()
}

const removePost = function() {
  const isRemove = confirm("게시글을 삭제하겠습니까?");
  if (isRemove) {
    postRepository.removePost(props.post.id)
    .then((response) => {
      console.log(response);
      toast.showToast("게시글을 삭제했습니다.");
      router.replace("/");
    })
    .catch((e) => {
      console.log(e);
      toast.showToast("자신의 게시글이 아닙니다.");
    })
  }
}

onMounted(() => {
  const saveProfile = profileRepository.getProfile();
  if (saveProfile != null) {
    state.memberProfile = saveProfile;
  }
})
</script>

<template>
  <div class="container my-5">
    <div class="card">
      <div class="card-header board-header">
        <div class="row">
          <div class="col-4">카테고리명 : <span>{{ props.post?.categoryName }}</span></div>
        </div>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-4">글 번호 : <span>{{ props.post?.id }}</span></div>
          <div class="col-4">작성자 : <span>{{ props.post?.memberName }}</span></div>
          <div class="col-4">조회수 : <span>{{ props.post?.views }}</span></div>
        </div>
        <div class="row mb-3">
          <div class="col-12">글 제목 : <span>{{ props.post?.title }}</span></div>
        </div>
        <div class="row mb-3">
          <div class="col-12">등록일 : <span>{{ props.post?.regDate }}</span></div>
        </div>
        <hr>
        <div>
          {{ props.post?.content }}
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-end mt-3">
        <button type="button" class="btn btn-primary me-2" @click="prevPage()">뒤로가기</button>
        <button type="button" class="btn btn-primary me-2" v-if="state.memberProfile != null && state.memberProfile.id == props.post.memberId">수정</button>
        <button type="button" class="btn btn-primary" v-if="state.memberProfile != null && state.memberProfile.id == props.post.memberId" @click="removePost()">삭제</button>
    </div>
  </div>
</template>