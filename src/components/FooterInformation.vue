<script setup lang="ts">
</script>

<style scoped>
.l-footer {
  padding: 3rem 0 0;
  background-color: black;
  color: white;
}

.p-footer__contentsWrap {
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  margin: 0 auto;
}

.p-footer__list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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
  text-align: center;
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
  <footer class="l-footer">
    <section class="p-footer__contentsWrap">
      <section class="p-footer__list">
        <section class="p-footerContents">
          <section class="c-service__icon">サービスロゴ</section>
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
      <span class="p-copyright">
        © 2023 YouKnow
      </span>
    </section>
  </footer>
</template>
