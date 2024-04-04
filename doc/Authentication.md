## Auth0

### コールバック関数の設定の仕方
1. Auth0のテナントを開く
1. 左ペインActions→Library

![auth0-1](https://github.com/notwo/youknowFrontend/assets/2118233/d7526b17-ef7d-4ce5-9f61-b34f748c72cd)

3. Customタブ→Create Action→Build from scratchを開く 
![auth0-2](https://github.com/notwo/youknowFrontend/assets/2118233/a6835eaf-d25f-40f1-bd16-50e8ac124e18)
![auth0-3](https://github.com/notwo/youknowFrontend/assets/2118233/e3a9908d-4946-4911-9832-224ee1487beb)

4. 以下の通りに設定
   1. Name: 関数名
   2. Trigger: Post User Registration
   3. Runtime: Node 18 (Recommended)
5. Create
6. 左ペインActions→Flows
![auth0-4](https://github.com/notwo/youknowFrontend/assets/2118233/7e56422d-2554-4613-891d-208e7ce32ed9)
7. Post User Registrationを開く
![auth0-5](https://github.com/notwo/youknowFrontend/assets/2118233/c1797c92-01c2-475e-8d0b-c6974c1fe7ed)
8. 5で作った関数名をクリック、To view or update this custom action, go here.のリンクを開く
9. 以下を参考に関数を定義する
![auth0-6](https://github.com/notwo/youknowFrontend/assets/2118233/9ea24dda-009d-4496-a49a-dfb815589393)

※Post User Registration以外のアクションに対してもコールバックを定義できる
