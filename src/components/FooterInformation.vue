<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped>
.l-footer {
  padding: 3rem 0 0;
  background-color: black;
}

.c-service__icon a {
  font-weight: bold;
  color: white;
}

.p-footer__contentsWrap {
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  margin: 0 auto;
}

.p-footerContents__subject {
  font-weight: bold;
}
.p-footerContents__item {
  margin: .8rem 0;
}

.p-copyright {
  margin: .8rem 0;
  font-size: .78rem;
}

/* sp */
@media screen and (max-width: 640px) {
  .p-footer__list {
    margin: 0 2rem;
  }
  .p-footerContents {
    font-size: .8rem;
  }
}

/* tablet */
@media screen and (min-width: 641px) and (max-width: 1200px) {
  .p-footer__list {
    margin: 0 5rem;
  }
  .p-footerContents {
    font-size: .9rem;
  }
}
</style>

<template>
  <footer class="l-footer c-color--white">
    <section class="p-footer__contentsWrap">
      <section class="p-footer__list c-flex--spaceBetween c-flex--wrap">
        <section class="p-footerContents">
          <section class="c-service__icon">
            <router-link v-if="route.fullPath !== '/'" :to="{ name: 'top', params: {} }">サービスロゴ</router-link>
            <span v-else>サービスロゴ</span>
          </section>
        </section>
        <section class="p-footerContents">
          <nav>
            <span class="p-footerContents__subject">YouKnowについて</span>
            <ul>
              <li class="p-footerContents__item">YouKnowの使い方</li>
              <li class="p-footerContents__item">リリース</li>
            </ul>
          </nav>
        </section>
        <section class="p-footerContents">
          <nav>
            <span class="p-footerContents__subject">諸情報</span>
            <ul>
              <li class="p-footerContents__item">プライバシーポリシー</li>
              <li class="p-footerContents__item">利用規約</li>
            </ul>
          </nav>
        </section>
      </section>
      <span class="p-copyright c-text--center">
        © 2023 YouKnow
      </span>
    </section>
  </footer>
</template>
