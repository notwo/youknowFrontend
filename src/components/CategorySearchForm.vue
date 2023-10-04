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
import axios, { AxiosResponse, AxiosError } from "axios";

export default defineComponent({
  name: 'CategorySearchForm',
  components: {},
  setup() {
    const route = useRoute();
    const store = inject('category');

    interface ErrorResponse {
      message: String,
      name: String,
      code: String
    };

    const onSearch = async (event: HTMLButtonEvent) => {
      const word = document.getElementById('search');
      if (word.value === '') {
        store.restore();
        return;
      }

      await axios.get(`http://127.0.0.1:8000/api/libraries/${route.params.library_id}/categories/?title=${word.value}`)
      .then((response: AxiosResponse) => {
        if (response.data.length <= 0) {
          store.allClear();
          return;
        }
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
