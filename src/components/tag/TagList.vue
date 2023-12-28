<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import TagItem from "@/components/tag/TagItem.vue";
import TagForm from "@/components/tag/TagForm.vue";

const { user, isAuthenticated } = useAuth0();
const store = inject('tag');

onMounted(() => {
  if (!isAuthenticated || !user.value.sub) {
    location.href = window.location.origin;
  }

  // ライブラリ一覧に遷移した際にスクロール位置が戻っていないので、強制的にスクロールさせる
  document.documentElement.scrollTop = 0;
});

onUnmounted(() => {
  store.allClear();
  store.restoreFirstLoaded();
});
</script>

<style scoped>
#p-tagList {
  width: 100%;
}

.p-tag__body {
  margin: .8rem;
  border-radius: .3rem;
  background-color: rgba(101, 75, 250, 0.9);
}

.p-tag__itemWrap {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  margin: 3rem .8rem;
}

.p-emptyMessage {
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

/* sp */
@media screen and (max-width: 414px) {
  .p-emptyMessage {
    margin: 2rem;
    font-size: 2rem;
    text-align: center;
  }
}

/* tablet */
@media screen and (min-width: 415px) and (max-width: 1024px) {
  .p-emptyMessage {
    margin: 2rem;
    font-size: 3rem;
    text-align: center;
  }
}
</style>

<template>
  <article id="p-tagList">
    <TagForm />
    <section class="p-tag__body" v-if="store.items.list.length > 0">
      <section class="p-tag__itemWrap">
        <TagItem
          v-for="tag in store.items.list"
            :key="tag.id"
            :id="tag.id"
            :title="tag.title"
        />
      </section>
    </section>
    <section v-else-if="store.firstLoaded.value">
      <p class="p-emptyMessage">タグを追加してみましょう</p>
    </section>
    <section v-else>
      <!-- ここにローディング -->
    </section>
  </article>
</template>
