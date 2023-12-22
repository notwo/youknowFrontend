<script set lang="ts">
</script>

<style scoped>
footer {
  padding: 3rem 0 0;
  background-color: black;
  color: white;
}

.footer-contents-wrap {
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  margin: 0 auto;
}

.footer-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-contents-subject {
  font-weight: bold;
}
.footer-contents-list {
  margin: .8rem 0;
}

.copyright {
  margin: .8rem 0;
  font-size: .78rem;
  text-align: center;
}

/* sp */
@media screen and (max-width: 414px) {
  .footer-list {
    margin: 0 2rem;
  }
  .footer-contents {
    font-size: .8rem;
  }

}
</style>

<template>
  <footer>
    <section class="footer-contents-wrap">
      <section class="footer-list">
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
    </section>
  </footer>
</template>
