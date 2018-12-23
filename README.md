# jueyin(掘银)

## Build Setup

```bash
# Clone project
git clone 

# Install dependencies
npm install

# Serve with hot reload at localhost:9528
npm run dev

# Build for production with minification
npm run build

# Build for production and view the bundle analyzer report
npm run build --report
```

```
.
├── build
├── config
├── favicon.ico
├── index.html
├── LICENSE
├── node_modules
├── package.json
├── package-lock.json
├── README.md
├── src
└───├── api           // 抽离api单独维护
    ├── App.vue
    ├── assets
    ├── components    // 项目通用组件
    ├── icons
    ├── main.js       
    ├── permission.js // 路由守卫，控制前端路由访问权限
    ├── router
    │   └── index.js  // router中添加路径，组件放在views中，导航信息将自动渲染到导航栏
    ├── store         // vuex 全局使用
    │   ├── getters.js
    │   ├── index.js
    │   └── modules
    ├── styles
    ├── utils         // 通用工具函数
    │   ├── auth.js
    │   ├── index.js
    │   ├── request.js
    │   └── validate.js
    └── views         // 页面
        ├── 404.vue
        ├── article
        ├── editor
        ├── frontpage
        ├── layout
        ├── login
        └── tree
└── static

```