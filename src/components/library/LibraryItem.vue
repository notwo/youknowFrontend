<script setup lang="ts">
import { inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import LibraryEditButton from "@/components/library/LibraryEditButton.vue";
import { libraryApi } from '@/plugin/apis';
import { timeFormat, titleForView, contentForView } from '@/plugin/util';
import Tooltip from '@/components/Tooltip.vue';

const props = defineProps({
  edit_state: Object,
  id: Number,
  title: String,
  content: String,
  updated_at: String
});

const { user } = useAuth0();
const store = inject('library');
const dialogStore = inject('dialog');

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const removeLibrary = (event: HTMLEvent<HTMLButtonElement>): void => {
  if (!window.confirm(`ライブラリ「${props.title}」が削除されますが宜しいですか？`)) {
    return;
  }

  interface ErrorResponse {
    message: String,
    name: String,
    code: String
  };

  const api = libraryApi();

  store.remove(props.id); // api実行前に呼ばないとstoreの中身が検索できない
  const id = event.currentTarget.getAttribute('data-id') as String;
  axios.delete(api.detailUrl(user.value.sub, id))
    .then((response: AxiosResponse) => {
      dialogStore.func.value('', 'ライブラリを削除しました');
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('削除エラー', 'ライブラリ削除中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
    });
};
</script>

<style scoped>
.p-library__item {
  position: relative;
  flex-wrap: wrap;
  width: 30%;
  height: 20rem;
  margin: 1rem;
  border: 1px #85ccff solid;
  border-radius: .3rem;
  z-index: 0;
}
.p-library__item:hover {
  border: 1px rgb(74, 92, 255) solid;
}

.p-library__item a {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.p-library__menu {
  margin: .6rem;
  z-index: 1;
}

.p-library__menuLink {
  margin: .3rem;
  z-index: 1;
}

.p-library__menuLink:hover {
  color: #888;
  cursor: pointer;
}

.p-library__body {
  margin: 1rem .5rem;
}

.p-library__title {
  margin: 1rem 0;
  font-size: 1.4rem;
  font-weight: 800;
}

.p-library__contents {
  margin: 1rem 0;
  line-height: 1.5rem;
}

.p-library__updated_at {
  position: absolute;
  bottom: .5rem;
  left: .5rem;
  font-size: .8rem;
}

/* sp */
@media screen and (max-width: 414px) {
  .p-library__item {
    width: 80%;
    height: 15rem;
    margin: 1rem;
  }

  .p-library__title {
    margin: .7rem 0;
    font-size: 1.4rem;
    font-weight: 800;
  }

  .p-library__contents {
    margin: .7rem 0;
    line-height: 1.5rem;
  }
}

/* tablet */
@media screen and (min-width: 415px) and (max-width: 1024px) {
  .p-library__item {
    width: 90%;
    height: 15rem;
    margin: 1rem;
  }

  .p-library__title {
    margin: .7rem 0;
    font-size: 1.4rem;
    font-weight: 800;
  }

  .p-library__contents {
    margin: .7rem 0;
    line-height: 1.5rem;
  }
}
</style>

<template>
  <section class="p-library__item c-fadeIn--normal js-tooltip__content">
    <router-link :to="{ name: 'categories', params: { username: String($route.params.username), library_id: id } }"></router-link>
    <section class="p-library__menu c-flex--end">
      <section class="p-library__menuLink">
        <LibraryEditButton :edit_state="edit_state" :id="id" :title="title" :content="content" />
      </section>
      <section class="p-library__menuLink">
        <span @click="removeLibrary" class="p-delete__link" :data-id="id">削除</span>
      </section>
    </section>
    <section class="p-library__body js-tooltip__title">
      <p class="p-library__title">{{ titleForView(title, 'library') }}</p>
      <p class="p-library__contents">{{ contentForView(content, 'library') }}</p>
    </section>
    <span class="p-library__updated_at">{{ timeFormat(updated_at) }} 更新</span>
  </section>
  <Tooltip :message="title" />
</template>
