<script setup lang="ts">
</script>

<style scoped>
.p-error__message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.9rem;
  font-size: 1.2rem;
}

.p-error__message p {
}

.p-to__top a {
  color: #444;
  text-decoration: none;
}

/* sp */
@media screen and (max-width: 768px) {
  .p-error__message {
    margin: 2rem;
    font-size: 1rem;
  }

  .p-to__top a {
    font-size: 1.2rem;
    font-weight: 600;
  }
}
</style>

<template>
  <!-- TODO: ここにYouKnowの404画像を載せたい -->
  <section class="p-error__message c-text--center">
    <p>お探しのページが見つかりませんでした。<br>
      入力されたURLが間違っているか、データが既に存在しない可能性があります。</p>
  </section>
  <section class="p-to__top c-flex--center">
    <router-link :to="{ name: 'top' }">
      You Know TOPへ戻る
    </router-link>
  </section>
</template>
