<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue';
import axios, { AxiosResponse, AxiosError } from "axios";
import { useAuth0 } from '@auth0/auth0-vue';
import { libraryApi } from '@/plugin/apis';

const props = defineProps({
  contentType: String,
  contentName: String,
});

interface HTMLEvent<T extends EventTarget> extends Event {
  target: T;
};

const { user } = useAuth0();
const store = inject('library');
const dialogStore = inject('dialog');

const deleteCheckedItem = (event): void => {
  const checkedItems = document.querySelectorAll<HTMLInputElement>('.js-deleteCheckItem:checked');
  if (checkedItems.length === 0) { return; }
  const ids = [] as Array<Number>;
  checkedItems.forEach((input) => { ids.push(Number(input.dataset.id)); });

  if (!window.confirm(`選択された${props.contentName}が削除されますが宜しいですか？`)) {
    return;
  }

  const api = libraryApi();

  axios.delete(api.multiDeleteUrl(user.value.sub, ids))
    .then((response: AxiosResponse) => {
      dialogStore.func.value('', 'ライブラリを削除しました');
      store.removeList(ids);
    })
    .catch((e: AxiosError<ErrorResponse>) => {
      dialogStore.func.value('削除エラー', 'ライブラリ削除中にエラーが起きました。暫くお待ちいただいてから再度お試しください', 'error');
    });
};

const setFixedToButton = (event): void => {
  const deleteCheckBtn = document.getElementById('deleteCheckBtn') as HTMLElement;
  if (window.scrollY <= 50) {
    deleteCheckBtn.classList.remove('scroll');
  } else {
    deleteCheckBtn.classList.add('scroll');
  }
};

onMounted(() => {
  window.addEventListener("scroll", setFixedToButton, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', setFixedToButton, false);
});
</script>

<style scoped>
.p-btn__deleteCheck {
  position: fixed;
  top: 18rem;
  right: 2rem;
  transition: .2s;
  z-index: 8998;
}
.p-btn__deleteCheck a {
  display: block;
  position: relative;
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  cursor: pointer;
  background-color: rgba(255, 41, 41, 0.6);
  overflow: hidden;
}
.p-btn__deleteCheck a:hover {
  background-color: rgba(255, 102, 94, 0.6);
}
.p-btn__deleteCheck a:before {
  display: block;
  position: absolute;
  content: "";
  top: 51%;
  left: 70%;
  width: 5px;
  height: 33px;
  border-radius: .4rem;
  margin-left: -23%;
  margin-top: -28%;
  font-size: 2rem;
  transform: rotate(90deg);
  background-color: white;
}

/* sp */
@media screen and (max-width: 768px) {
  .p-btn__deleteCheck {
    right: .3rem;
    top: 17.6rem;
  }
  .p-btn__deleteCheck.scroll {
    top: 16.5rem;
  }

  .p-btn__deleteCheck a {
    width: 2.5rem;
    height: 2.5rem;
  }
  .p-btn__deleteCheck a:before {
    top: 46%;
    left: 68%;
    width: 4px;
    height: 27px;
  }
}
@media screen and (max-width: 768px) {
  .p-btn__deleteCheck.scroll {
    top: 16.5rem;
  }
}

/* tablet */
@media screen and (min-width: 768px) and (max-width: 1409px) {
  .p-btn__deleteCheck {
    right: 1rem;
  }
}
</style>

<template>
  <section id="deleteCheckBtn" class="p-btn__deleteCheck">
    <a @click="deleteCheckedItem"></a>
  </section>
</template>
