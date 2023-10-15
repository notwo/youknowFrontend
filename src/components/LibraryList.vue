<template>
  <article id="library-list">
    <LibraryItem
      v-for="library in libraryList"
      :key="library.id"
      :id="library.id"
      :title="library.title"
      :content="library.content"
      :custom_user="library.custom_user"
      :custom_user_id="library.custom_user_id"
      :created_at="library.created_at"
      :updated_at="library.updated_at"
    />
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import LibraryItem from "@/components/LibraryItem.vue";

export default defineComponent({
  name: 'LibraryList',
  components: {
    LibraryItem
  },
  setup() {
    const { user, isAuthenticated } = useAuth0();
    const libraryList = ref([]);
    const store = inject('library');

    onMounted(() => {
      if (!isAuthenticated || !user.value.sub) {
        location.href = window.location.origin;
      }

      interface LibraryResponse {
        data: []
      };
      interface ErrorResponse {
        error: string
      };

      axios.get<LibraryResponse>(`${import.meta.env.VITE_API_URL}/api/users/${user.value.sub}/libraries/`)
        .then((response: AxiosResponse) => {
          if (response.data.length >= 1) {
            libraryList.value = response.data;
            store.setItem(response.data);
          }
        })
        .catch((e: AxiosError<ErrorResponse>) => {
        });
    });

    return {
      libraryList
    };
  },
});
</script>

<style scoped>
#library-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
