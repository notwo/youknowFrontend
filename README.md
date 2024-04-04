知識整理アプリ「youknow」のFrontend部分

## Backend(DRF)
https://github.com/notwo/youknow


## 開発用コマンド
<details>
<summary>ここをクリック</summary>

### 作業フォルダに移動
```Bash
cd ~/Desktop/work/youknowFrontend
```

### VSCode (VueJS)
```Bash
npm run dev
```
</details>

# 運用
<details>
<summary>ここをクリック</summary>

## 認証
外部サービスのAuth0を利用している

コールバック関数の登録方法は[こちら](doc/Authentication.md)

## デプロイ
[render.com](https://render.com)へデプロイする(GitHub連携済)

mainブランチにマージされた際に自動でデプロイされる

## 定期アクセス
Uptime Robotにより、Frontendのみ定期的にアクセスさせている
これはRender.comの自動シャットダウンを防ぐため

</details>

# 今後の方針
残りのissuesに従って、合間合間に実装を進める

単体テストも随時追加予定
