<script setup lang="ts">
</script>

<style scoped>
.error-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.9rem;
  font-size: 1.2rem;
}

.error-message p {
  text-align: center;
}

.to-top {
  display: flex;
  justify-content: center;
}

.to-top a {
  color: #444;
  text-decoration: none;
}
</style>

<template>
  <!-- ここにYouKnowの404画像を載せたい -->
  <section class="error-message">
    <p>お探しのページが見つかりませんでした。<br>
      入力されたURLが間違っているか、データが既に存在しない可能性があります。</p>
  </section>
  <section class="to-top">
    <router-link :to="{ name: 'top' }">
      You Know TOPへ戻る
    </router-link>
  </section>
</template>
