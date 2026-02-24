# Personal Page Monorepo (Java + Vue)

这是一个个人主页项目的基础框架：

- 后端：Java 17 + Spring Boot + Maven + MySQL + Redis + Kafka + Dubbo + ZooKeeper + Tomcat
- 前端：Vue 3 + Vite

## 目录结构

```text
.
├── backend
│   ├── pom.xml
│   └── src/main
└── frontend
    ├── package.json
    └── src
```

## 快速启动

### 启动后端

```bash
cd backend
mvn spring-boot:run
```

### 启动前端

```bash
cd frontend
npm install
npm run dev
```

## 设计说明

- 当前 UI 采用“后端工程师个人主页”的暗色技术风格骨架。
- 预留了兴趣爱好、项目经历、技术文章等扩展模块位。
- 若仓库根目录提供 `/figma` 设计文件，可按其设计 tokens 和组件细化页面样式。
