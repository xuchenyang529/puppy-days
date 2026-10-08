# puppy days

浏览器虚拟养犬原型：生活方式问卷、22 种犬种推荐、领养、日常照顾和 30 天试养报告。

## 本地运行

Node.js 22.12 或更新版本。

```sh
npm ci
npm run dev
```

## GitHub Pages

仓库 Settings → Pages → Source 选择 GitHub Actions。推送 main 后自动构建发布。

```sh
PAGES_BASE_PATH=/puppy-days/ node scripts/build-pages.mjs
```

发布目录为 `dist/client`。Pages 不需要 Sites Worker，构建脚本保留手机模拟器源码，并在发布产物中适配仓库路径。

用户进度只保存在当前浏览器 localStorage。不同域名、设备或浏览器之间不会同步。遛狗为浏览器体验，不代表真实定位或步数验证。
