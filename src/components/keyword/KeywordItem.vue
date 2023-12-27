<template>
  <section class="keyword-item tooltip-content">
    <router-link :to="{ name: 'keyword', params: {
      username: String($route.params.username),
      library_id: $route.params.library_id,
      category_id: $route.params.category_id,
      keyword_id: id
    } }">
    </router-link>
    <section class="keyword-menu">
      <section class="keyword-menu-item">
        <KeywordEditButton :edit_state="edit_state" :id="id" :title="title" :content="content" />
      </section>
      <section class="keyword-menu-item">
        <span @click="removeKeyword" class="delete-item" :data-id="id">削除</span>
      </section>
    </section>
    <section class="keyword-item-body">
      <p class="title">{{ titleForView(title, 'keyword') }}</p>
      <p class="contents">{{ contentForView(content, 'keyword') }}</p>
      <section class="tags">
        <span class="tag-item" v-for="tag of tags" :key="tag.id">
          {{ titleForView(tag.title, 'tag') }}
        </span>
      </section>
    </section>
    <span class="updated_at">{{ timeFormat(updated_at) }} 更新</span>
  </section>
  <Tooltip :message="title" />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRoute } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import KeywordEditButton from "@/components/keyword/KeywordEditButton.vue";
import { keywordApi } from '@/plugin/apis';
import { timeFormat, titleForView, contentForView } from '@/plugin/util';
import Tooltip from '@/components/Tooltip.vue';

export default defineComponent({
  name: 'KeywordItem',
  components: {
    KeywordEditButton,
    Tooltip
  },
  props: {
    edit_state: Object,
    id: Number,
    title: String,
    content: String,
    custom_user: String,
    custom_user_id: String,
    created_at: String,
    updated_at: String,
    tags: Array
  },
  setup(props) {
    const { user } = useAuth0();
    const store = inject('keyword');
    const dialogStore = inject('dialog');
    const api = keywordApi();
    const route = useRoute();

    interface HTMLEvent<T extends EventTarget> extends Event {
      target: T;
    };

    const removeKeyword = (event: HTMLEvent<HTMLButtonElement>): void => {
      if (!window.confirm(`キーワード「${props.title}」が削除されますが宜しいですか？`)) {
        return;
      }

      interface ErrorResponse {
        message: String,
        name: String,
        code: String
      };

      store.remove(props.id); // api実行前に呼ばないとstoreの中身が検索できない
      const id = event.currentTarget.getAttribute('data-id');
      axios.delete(api.detailUrl(user.value.sub, route.params.library_id, route.params.category_id, id))
      .then((response: AxiosResponse) => {
        dialogStore.func.value('', 'キーワードを削除しました');
      })
      .catch((e: AxiosError<ErrorResponse>) => {
        dialogStore.func.value('削除エラー', 'キーワード削除中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
      });
    };

    return {
      user,
      timeFormat,
      titleForView,
      contentForView,
      removeKeyword
    };
  }
});
</script>

<style scoped>
.keyword-item {
  position: relative;
  flex-wrap: wrap;
  width: 90%;
  height: auto;
  margin: 1rem;
  border: 1px #85ccff solid;
  border-radius: .3rem;
  z-index: 0;
  animation: fadeIn .7s ease;
}
.keyword-item:hover {
  border: 1px rgb(74, 92, 255) solid;
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

.keyword-item a {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.keyword-menu {
  display: flex;
  justify-content: flex-end;
  margin: .6rem;
  z-index: 1;
}

.keyword-menu-item {
  margin: .3rem;
  z-index: 1;
}

.keyword-menu-item:hover {
  color: #888;
  cursor: pointer;
}

.keyword-item-body {
  margin: 1rem .5rem;
}

.title {
  margin: 1rem 0;
  font-size: 1.4rem;
  font-weight: 800;
}

.contents {
  margin: 1rem 0;
  line-height: 1.5rem;
}

.updated_at {
  margin: .3rem;
  font-size: .8rem;
}

.tags {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: .6rem .4rem;
  max-height: 6rem;
  background: rgba(101, 75, 250, 0.9);
  border-radius: .2rem;
}

.tag-item {
  margin: .5rem;
  padding: .24rem .55rem;
  font-size: .8rem;
  background: rgba(255,255,255,.9);
  border-radius: .2rem;
}

/* sp */
@media screen and (max-width: 768px) {
  .keyword-item {
    width: 80%;
    margin: 1rem;
  }

  .title {
    margin: .7rem 0;
    font-size: 1.4rem;
    font-weight: 800;
  }

  .contents {
    margin: .7rem 0;
    line-height: 1.5rem;
  }

  .tags {
    max-height: none;
  }
}

/* tablet */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .keyword-item {
    width: 90%;
    margin: 1rem;
  }

  .title {
    margin: .7rem 0;
    font-size: 1.4rem;
    font-weight: 800;
  }

  .contents {
    margin: .7rem 0;
    line-height: 1.5rem;
  }
}
</style>
