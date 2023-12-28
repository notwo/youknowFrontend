<template>
  <section class="p-category__item c-fadeIn--normal js-tooltip__content">
    <router-link :to="{ name: 'keywords', params: { username: String($route.params.username), library_id: $route.params.library_id, category_id: id } }"></router-link>
    <section class="p-category__menu">
      <section class="p-category__menuLink">
        <CategoryEditButton :edit_state="edit_state" :id="id" :title="title" :content="content" />
      </section>
      <section class="p-category__menuLink">
        <span @click="removeCategory" class="p-delete__link" :data-id="id">削除</span>
      </section>
    </section>
    <section class="p-category__body js-tooltip__title">
      <p class="p-category__title">{{ titleForView(title, 'category') }}</p>
      <p class="p-category__contents">{{ contentForView(content, 'category') }}</p>
    </section>
    <span class="p-category__updated_at">{{ timeFormat(updated_at) }} 更新</span>
  </section>
  <Tooltip :message="title" />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { useRoute } from 'vue-router';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import CategoryEditButton from "@/components/category/CategoryEditButton.vue";
import { timeFormat, titleForView, contentForView } from '@/plugin/util';
import { categoryApi } from '@/plugin/apis';
import Tooltip from '@/components/Tooltip.vue';

export default defineComponent({
  name: 'CategoryItem',
  components: {
    CategoryEditButton,
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

    interface ErrorResponse {
      message: String,
      name: String,
      code: String
    };

    interface HTMLEvent<T extends EventTarget> extends Event {
      target: T;
    };

    const api = categoryApi();
    const route = useRoute();
    const store = inject('category');
    const dialogStore = inject('dialog');
    const removeCategory = (event: HTMLEvent<HTMLButtonElement>): void => {
      if (!window.confirm(`カテゴリ「${props.title}」が削除されますが宜しいですか？`)) {
        return;
      }

      store.remove(props.id); // api実行前に呼ばないとstoreの中身が検索できない
      const id = event.currentTarget.getAttribute('data-id');
      axios.delete(api.detailUrl(user.value.sub, route.params.library_id, id))
        .then((response: AxiosResponse) => {
          dialogStore.func.value('', 'カテゴリを削除しました');
        })
        .catch((e: AxiosError<ErrorResponse>) => {
          dialogStore.func.value('削除エラー', 'カテゴリ削除中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
        });
    };

    return {
      timeFormat,
      titleForView,
      contentForView,
      removeCategory
    };
  }
});
</script>

<style scoped>
.p-category__item {
  position: relative;
  flex-wrap: wrap;
  width: 90%;
  height: 16rem;
  margin: 1rem;
  border: 1px #85ccff solid;
  border-radius: .3rem;
  z-index: 0;
}
.p-category__item:hover {
  border: 1px rgb(74, 92, 255) solid;
}

.p-category__item a {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.p-category__menu {
  display: flex;
  justify-content: flex-end;
  margin: .6rem;
  z-index: 1;
}

.p-category__menuLink {
  margin: .3rem;
  z-index: 1;
}

.p-category__menuLink:hover {
  color: #888;
  cursor: pointer;
}

.p-category__body {
  margin: 1rem .5rem;
}

.p-category__title {
  margin: 1rem 0;
  font-size: 1.4rem;
  font-weight: 800;
}

.p-category__contents {
  margin: 1rem 0;
  line-height: 1.5rem;
}

.p-category__updated_at {
  position: absolute;
  bottom: .5rem;
  left: .5rem;
  font-size: .8rem;
}

/* sp */
@media screen and (max-width: 414px) {
  .p-category__item {
    width: 80%;
    height: 15rem;
    margin: 1rem;
  }

  .p-category__title {
    margin: .7rem 0;
    font-size: 1.4rem;
    font-weight: 800;
  }

  .p-category__contents {
    margin: .7rem 0;
    line-height: 1.5rem;
  }
}

/* tablet */
@media screen and (min-width: 415px) and (max-width: 1024px) {
  .p-category__item {
    width: 90%;
    height: 15rem;
    margin: 1rem;
  }

  .p-category__title {
    margin: .7rem 0;
    font-size: 1.4rem;
    font-weight: 800;
  }

  .p-category__contents {
    margin: .7rem 0;
    line-height: 1.5rem;
  }
}
</style>
