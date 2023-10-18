<template>
  <article id="library-list">
    <LibraryModal :edit_state="edit_state" />
    <section class="library-item">
      <LibraryItem
        :edit_state="edit_state"
        v-for="library in LibraryList"
        :key="library.id"
        :id="library.id"
        :title="library.title"
        :content="library.content"
        :custom_user="library.custom_user"
        :custom_user_id="library.custom_user_id"
        :created_at="library.created_at"
        :updated_at="library.updated_at"
      />
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import LibraryModal from '@/components/modal/LibraryModal.vue';
import LibraryItem from "@/components/LibraryItem.vue";

export default defineComponent({
  name: 'LibraryList',
  components: {
    LibraryModal,
    LibraryItem
  },
  setup() {
    const { user, isAuthenticated } = useAuth0();
    const LibraryList = ref([]);
    const store = inject('library');

    let edit_state = reactive({
      title: '',
      content: ''
    });

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

      axios.get<LibraryResponse>(`${import.meta.env.VITE_API_URL}/api/users/${user.value.sub}/libraries/?limit=15&offset=0`)
        .then((response: AxiosResponse) => {
          LibraryList.value = response.data.results;
          store.setItem(response.data.results);
        })
        .catch((e: AxiosError<ErrorResponse>) => {
        });
    });

    return {
      edit_state,
      LibraryList
    };
  },
});
</script>

<style scoped>
.library-item {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}

</style>
