<template>
  <section class="search-form">
    <form action="">
      <input type="text" name="search" id="search">
      <button type="button" @click="onSearch">カテゴリを検索</button>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth0 } from '@auth0/auth0-vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { categorySearchUrl } from '@/plugin/apis';

export default defineComponent({
  name: 'CategorySearchForm',
  components: {},
  setup() {
    const route = useRoute();
    const { user } = useAuth0();
    const store = inject('category');

    interface ErrorResponse {
      message: String,
      name: String,
      code: String
    };

    const onSearch = (event: HTMLButtonEvent) => {
      const word = document.getElementById('search');
      if (word.value === '') {
        store.restore();
        return;
      }

      axios.get(categorySearchUrl(user.value.sub, route.params.library_id, word.value))
      .then((response: AxiosResponse) => {
        // 検索後は一括で結果を返すようにしておく。今後検索後に対してもページングする場合はコメントアウトを外す(更にAPIの修正も必要)
        //if (response.data.results.length <= 0) {
        if (response.data.length <= 0) {
          store.allClear();
          return;
        }
        //store.search(response.data.results);
        store.search(response.data);
      })
      .catch((e: AxiosError<ErrorResponse>) => {
        store.allClear();
        console.log(`${e.message} ( ${e.name} ) code: ${e.code}`);
      });
    }

    return {
      onSearch
    };
  }
});
</script>
