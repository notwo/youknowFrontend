<template>
  <section class="search-form">
    <form action="">
      <input type="text" name="search" id="search">
      <button type="button" @click="onSearch">ライブラリを検索</button>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import axios, { AxiosResponse, AxiosError } from "axios";

export default defineComponent({
  name: 'LibrarySearchForm',
  components: {},
  setup() {
    const { user } = useAuth0();
    const store = inject('library');

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

      axios.get(`${import.meta.env.VITE_API_URL}/api/users/${user.value.sub}/libraries/?title=${word.value}`)
      .then((response: AxiosResponse) => {
        console.log(response.data)
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
