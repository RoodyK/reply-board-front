<script setup lang="ts">
import Pagination from '@/util/Pagination';
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  },
  totalCount: {
    type: Number,
    required: true
  }
});

const emits = defineEmits<{
  (e: 'movePage', page: number): void;
}>();

const pagination = computed(() => {
  return new Pagination(props.currentPage, props.pageSize, props.totalCount);
});

const totalPages = computed(() => {
  return pagination.value.getTotalPage()
});

const movePage = function(page: number) {
  if (page < 1 || page > totalPages.value) return;
  emits('movePage', page);
}
</script>

<template>
  <!-- Pagination -->
  <nav aria-label="Page navigation" class="mt-4">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: props.currentPage === 1 }">
        <button class="page-link" type="button" @click="movePage(props.currentPage - 1)">
          <span>&lt;</span>
        </button>
      </li>
      <li class="page-item" v-for="page in pagination.getPageArray()" :key="page" :class="{ active: props.currentPage === page }">
        <button class="page-link" type="button" @click="movePage(page)">{{ page }}</button>
      </li>
      <li class="page-item" :class="{ disabled: props.currentPage === totalPages }">
        <button class="page-link" type="button" @click="movePage(props.currentPage + 1)">
          <span>&gt;</span>
        </button>
      </li>
    </ul> 
  </nav>
</template>