<script set lang="ts">
</script>

<style scoped>
footer {
  padding: 3rem 0 0;
  background-color: black;
  color: white;
}

.footer-contents-wrap {
  max-width: 1100px;
  margin: 0 auto;
}
.footer-contents-subject {
  font-weight: bold;
}
.footer-contents-list {
  margin: .8rem 0;
}

.copyright {
  margin: .5rem 0;
  font-size: .78rem;
  text-align: center;
}
</style>

<template>
  <footer>
    <section class="footer-contents-wrap flex-contents">
      <section class="footer-contents">
        <section class="footer-contents-logo">サービスロゴ</section>
      </section>
      <section class="footer-contents">
        <nav>
          <section class="footer-contents-subject">YouKnowについて</section>
          <ul>
            <li class="footer-contents-list">YouKnowの使い方</li>
            <li class="footer-contents-list">リリース</li>
          </ul>
        </nav>
      </section>
      <section class="footer-contents">
        <nav>
          <section class="footer-contents-subject">諸情報</section>
          <ul>
            <li class="footer-contents-list">プライバシーポリシー</li>
            <li class="footer-contents-list">利用規約</li>
          </ul>
        </nav>
      </section>
    </section>
    <section class="copyright">
      © 2023 YouKnow
    </section>
  </footer>
</template>
