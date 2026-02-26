# Figma 产物落地清单（当前项目）

## 1) 设计文档类
- [ ] 将 Figma 导出的规范文档放到 `docs/figma/`
  - [ ] `Guidelines.md`（颜色、字号、间距、动效）
  - [ ] 其他说明文档

## 2) 样式类（前端运行时）
- [ ] 字体与字体族放 `frontend/src/styles/fonts.css`
- [ ] 主题变量（亮/暗）放 `frontend/src/styles/theme.css`
- [ ] 全局 reset 与基础布局放 `frontend/src/styles/base.css`
- [ ] 按钮/卡片/chip/动效放 `frontend/src/styles/components.css`
- [ ] 如新增样式文件，记得在 `frontend/src/styles/index.css` 中 `@import`

## 3) 静态资源类（图片/图标）
- [ ] 头像、插图、图标统一放到 `frontend/src/assets/`
- [ ] 在 Vue 组件中通过相对路径或 import 使用

## 4) 页面与组件映射
- [ ] 主页结构改动：`frontend/src/views/PersonalHome.vue`
- [ ] 通用卡片改动：`frontend/src/components/SectionCard.vue`
- [ ] API 字段映射：`frontend/src/api/profileApi.js`

## 5) 入口检查
- [ ] `frontend/src/main.js` 应只引入一个样式入口：`./styles/index.css`
- [ ] 本地运行 `npm run dev` 验证样式已生效
