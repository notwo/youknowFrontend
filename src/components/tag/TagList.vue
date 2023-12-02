<script setup lang="ts">
import { inject, onMounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import TagItem from "@/components/tag/TagItem.vue";
import TagForm from "@/components/tag/TagForm.vue";

const { user, isAuthenticated } = useAuth0();
const store = inject('tag');

onMounted(() => {
  if (!isAuthenticated || !user.value.sub) {
    location.href = window.location.origin;
  }

});
</script>

<style scoped>
/* 一旦視覚的にわかりやすくするためにつける */
#tag-list {
  background: rgba(210,210,210, 0.9);
  width: 100%;
  height: 79px;
}

.tag-item {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}

.empty-message {
  display: flex;
  justify-content: center;
  font-size: 2rem;
  animation: fadeIn .3s ease;
}

@keyframes fadeIn {
  0%{
    display: none;
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
</style>

<template>
  <article id="tag-list">
    <TagForm />
    <section class="tag-item" v-if="store.items.list.length > 0">
      <TagItem
        v-for="tag in store.items.list"
          :key="tag.id"
          :id="tag.id"
          :title="tag.title"
          :custom_user="tag.custom_user"
          :custom_user_id="tag.custom_user_id"
      />
    </section>
    <section v-else-if="store.firstLoaded.value">
      <p class="empty-message">タグを追加してみましょう</p>
    </section>
    <section v-else>
      <!-- ここにローディング -->
    </section>
  </article>
</template>
