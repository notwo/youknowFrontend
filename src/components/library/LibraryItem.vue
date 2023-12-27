<template>
  <section class="library-item tooltip-content">
    <router-link :to="{ name: 'categories', params: { username: String($route.params.username), library_id: id } }"></router-link>
    <section class="library-menu">
      <section class="library-menu-item">
        <LibraryEditButton :edit_state="edit_state" :id="id" :title="title" :content="content" />
      </section>
      <section class="library-menu-item">
        <span @click="removeLibrary" class="delete-item" :data-id="id">削除</span>
      </section>
    </section>
    <section class="library-item-body">
      <p class="title">{{ titleForView(title, 'library') }}</p>
      <p class="contents">{{ contentForView(content, 'library') }}</p>
    </section>
    <span class="updated_at">{{ timeFormat(updated_at) }} 更新</span>
  </section>
  <Tooltip :message="title" />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import LibraryEditButton from "@/components/library/LibraryEditButton.vue";
import { libraryApi } from '@/plugin/apis';
import { timeFormat, titleForView, contentForView } from '@/plugin/util';
import Tooltip from '@/components/Tooltip.vue';

export default defineComponent({
  name: 'LibraryItem',
  components: {
    LibraryEditButton,
    timeFormat,
    Tooltip
  },
  props: {
    edit_state: Object,
    id: Number,
    title: String,
    content: String,
    updated_at: String,
  },
  setup(props) {
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
      const id = event.currentTarget.getAttribute('data-id');
      axios.delete(api.detailUrl(user.value.sub, id))
      .then((response: AxiosResponse) => {
        dialogStore.func.value('', 'ライブラリを削除しました');
      })
      .catch((e: AxiosError<ErrorResponse>) => {
        dialogStore.func.value('削除エラー', 'ライブラリ削除中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
      });
    };

    return {
      user,
      titleForView,
      contentForView,
      timeFormat,
      removeLibrary
    };
  },
});
</script>

<style scoped>
.library-item {
  position: relative;
  flex-wrap: wrap;
  width: 30%;
  height: 20rem;
  margin: 1rem;
  border: 1px #85ccff solid;
  border-radius: .3rem;
  z-index: 0;
  animation: fadeIn .7s ease;
}
.library-item:hover {
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

.library-item a {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.library-menu {
  display: flex;
  justify-content: flex-end;
  margin: .6rem;
  z-index: 1;
}

.library-menu-item {
  margin: .3rem;
  z-index: 1;
}

.library-menu-item:hover {
  color: #888;
  cursor: pointer;
}

.library-item-body {
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
  position: absolute;
  bottom: .5rem;
  left: .5rem;
  font-size: .8rem;
}

/* sp */
@media screen and (max-width: 414px) {
  .library-item {
    width: 80%;
    height: 15rem;
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

/* tablet */
@media screen and (min-width: 415px) and (max-width: 1024px) {
  .library-item {
    width: 90%;
    height: 15rem;
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
