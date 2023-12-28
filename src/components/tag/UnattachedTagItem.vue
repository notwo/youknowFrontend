<script setup lang="ts">
import { inject } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { titleForView } from '@/plugin/util';
import { tagApi } from '@/plugin/apis';

const { user } = useAuth0();

const api = tagApi();
const store = inject('unattachedTag');
const dialogStore = inject('dialog');

const props = defineProps({
  id: Number,
  title: String
});
interface ErrorResponse {
  error: String
};

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const removeTag = (event: HTMLEvent<HTMLButtonElement>): void => {
  event.stopPropagation();
  if (!window.confirm(`タグ「${props.title}」が削除されますが宜しいですか？`)) {
    return;
  }

  store.remove(props.id); // api実行前に呼ばないとstoreの中身が検索できない
  const id = event.currentTarget.getAttribute('data-id') as String;
  axios.delete(api.detailUrl(user.value.sub, id))
    .then((response: AxiosResponse) => {
      dialogStore.func.value('', 'タグを削除しました');
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('削除エラー', 'タグ削除中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
    });
};

const selectTag = (event: HTMLEvent<HTMLButtonElement>): void => {
  event.stopPropagation();

  if (event.currentTarget.classList.contains('selected')) {
    event.currentTarget.classList.remove('selected');
  } else {
    event.currentTarget.classList.add('selected');
  }

  const selectedTags = document.getElementsByClassName('selected') as HTMLCollectionOf<HTMLElement>;
  if (selectedTags.length > 0) {
    document.getElementById('attachButton').removeAttribute('disabled');
  } else {
    document.getElementById('attachButton').setAttribute('disabled', '');
  }
};
</script>

<style scoped>
.p-unattachedTag__Item {
  margin: 0.2em;
  padding: 1em;
  border: 1px rgba(47, 7, 225, 0.9) solid;
  border-radius: .3rem;
  z-index: 0;
  animation: fadeIn .7s ease;
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

.p-unattachedTag__Item.selected {
  margin: 0.2em;
  padding: 1em;
  color: #eee;
  background: rgba(47, 7, 225, 0.9);
}

.p-unattachedTag__menu {
  display: flex;
  justify-content: flex-end;
  margin: .2rem;
  z-index: 1;
}

.p-unattachedTag__menuLink {
  margin: .3rem;
  z-index: 1;
}
.p-unattachedTag__menuLink:hover {
  color: #888;
  cursor: pointer;
}

.p-unattachedTag__body {
  margin: .5rem .5rem;
}

.p-unattachedTag__title {
  padding: .3rem 0;
  font-size: 1.4rem;
  font-weight: 800;
}

/* sp */
@media screen and (max-width: 767px) {
  .p-unattachedTag__Item {
    padding: .5em;
  }

  .p-unattachedTag__title {
    font-size: .8rem;
  }
}
</style>

<template>
  <section class="p-unattachedTag__Item" @click="selectTag" :data-id="id">
    <section class="p-unattachedTag__menu">
      <section class="p-unattachedTag__menuLink">
        <span @click="removeTag" class="p-delete__link" :data-id="id">削除</span>
      </section>
    </section>
    <section class="p-unattachedTag__body">
      <p class="p-unattachedTag__title">{{ titleForView(title, 'tag') }}</p>
    </section>
  </section>
</template>
