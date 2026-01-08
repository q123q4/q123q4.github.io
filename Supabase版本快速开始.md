# 🚀 Supabase 版本 - 快速开始指南

## ✅ 迁移已完成！

您的微信小程序图书管理系统已成功迁移到 **Supabase**。

---

## 📋 系统信息

### Supabase 环境
- **URL**: https://yajnakyuxvfhxtwwroaz.supabase.co
- **数据库**: PostgreSQL
- **状态**: ✅ 正常运行

### 数据库表
- ✅ `users` - 用户表
- ✅ `books` - 图书表
- ✅ `borrow_records` - 借阅记录表
- ✅ `categories` - 分类表

### 示例数据
- ✅ 5 个分类（文学、科技、历史、艺术、哲学）
- ✅ 6 本图书

---

## 🚀 第一步：创建 Supabase 用户

在微信小程序中使用之前，需要先在 Supabase 创建用户账号：

### 方法一：通过 Supabase Dashboard

1. 访问 https://supabase.com/dashboard
2. 选择您的项目
3. 进入 **Authentication** → **Users**
4. 点击 **Add user**
5. 填写：
   - **Email**: 输入邮箱
   - **Password**: 输入密码
   - **Auto Confirm User**: 勾选
6. 点击 **Create user**

### 方法二：通过小程序注册（待开发）

可以开发注册页面，用户在小程序中直接注册。

---

## 📱 第二步：打开小程序

### 1. 启动微信开发者工具

1. 打开微信开发者工具
2. 点击"导入项目"
3. 选择目录：`c:\Users\王博\Desktop\图书管理系统2`
4. 填写 AppID
5. 点击"新建"

### 2. 编译运行

1. 点击"编译"按钮
2. 在模拟器中查看效果

---

## 🔐 第三步：登录

### 登录流程

1. 点击底部的 **"我的"** 标签
2. 点击 **"立即登录"** 按钮
3. 输入：
   - **邮箱**: 在 Supabase 创建的邮箱
   - **密码**: 在 Supabase 设置的密码
4. 点击 **"登录"** 按钮
5. 登录成功后自动跳转到首页

---

## 📚 第四步：测试功能

### 1. 浏览图书

- 首页展示所有图书
- 可以按分类筛选（文学、科技、历史等）
- 支持搜索（书名、作者、ISBN）

### 2. 查看详情

- 点击任意图书卡片
- 查看图书详细信息
- 查看库存状态

### 3. 借阅图书

- 需要先登录
- 点击"立即借阅"按钮
- 借阅上限：5 本
- 借阅期限：30 天
- 查看应还日期

### 4. 我的借阅

- 点击底部的 **"借阅"** 标签
- 查看当前借阅的图书
- 显示应还日期
- 逾期图书会标红显示
- 点击"归还"按钮即可还书

### 5. 个人中心

- 查看用户信息
- 查看借阅统计
- 退出登录

---

## 🔄 主要变更说明

### 相比 CloudBase 版本

| 功能 | CloudBase | Supabase |
|-----|-----------|-----------|
| 登录方式 | 微信一键登录 | 邮箱密码登录 |
| 数据库 | MongoDB | PostgreSQL |
| API 调用 | 云函数 | REST API |
| 用户创建 | 自动创建 | 需手动创建或注册页 |
| 实时同步 | 支持 | 支持（需配置） |

---

## ⚠️ 重要提示

### 1. 需要先创建用户

在使用小程序前，必须先在 Supabase Dashboard 创建用户账号，否则无法登录。

### 2. 邮箱密码登录

当前版本使用邮箱密码登录，如需微信登录，需要额外开发：
- 使用 Supabase Custom Auth
- 或集成第三方认证服务

### 3. Token 管理

登录后，Token 保存在：
- `app.globalData.token` - 全局变量
- `wx.setStorageSync('token')` - 本地存储

---

## 🔧 配置说明

### Supabase API 配置

文件：`miniprogram/utils/api.js`

```javascript
const SUPABASE_URL = 'https://yajnakyuxvfhxtwwroaz.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

**注意**: 不要修改这些配置值。

---

## 📊 数据库结构

### books 表（图书）

| 字段 | 类型 | 说明 |
|-----|------|------|
| id | UUID | 主键 |
| isbn | VARCHAR(20) | ISBN 编号（唯一） |
| title | VARCHAR(255) | 书名 |
| author | VARCHAR(255) | 作者 |
| publisher | VARCHAR(255) | 出版社 |
| publish_date | DATE | 出版日期 |
| category | VARCHAR(50) | 分类 |
| price | DECIMAL(10,2) | 价格 |
| total_stock | INTEGER | 总库存 |
| available_stock | INTEGER | 可用库存 |
| description | TEXT | 简介 |
| cover_url | TEXT | 封面 URL |

### users 表（用户）

| 字段 | 类型 | 说明 |
|-----|------|------|
| id | UUID | 主键 |
| openid | VARCHAR(255) | 微信 openid（保留字段） |
| username | VARCHAR(100) | 用户名 |
| real_name | VARCHAR(100) | 真实姓名 |
| email | VARCHAR(255) | 邮箱 |
| user_type | VARCHAR(20) | 用户类型（admin/reader） |
| is_active | BOOLEAN | 账号状态 |
| max_borrow_limit | INTEGER | 借阅上限 |
| borrow_count | INTEGER | 当前借阅数量 |

### borrow_records 表（借阅记录）

| 字段 | 类型 | 说明 |
|-----|------|------|
| id | UUID | 主键 |
| user_id | UUID | 用户 ID（外键） |
| book_id | UUID | 图书 ID（外键） |
| book_title | VARCHAR(255) | 书名（冗余） |
| book_author | VARCHAR(255) | 作者（冗余） |
| borrow_date | TIMESTAMP | 借阅日期 |
| return_date | TIMESTAMP | 归还日期 |
| due_date | TIMESTAMP | 应还日期 |
| status | VARCHAR(20) | 状态 |
| fine | DECIMAL(10,2) | 罚款 |

---

## 🐛 常见问题

### Q1: 无法登录？
**A**: 检查以下几点：
- 邮箱和密码是否正确
- 是否在 Supabase 创建了用户
- 网络连接是否正常

### Q2: 数据无法加载？
**A**: 检查以下几点：
- Supabase URL 和 Anon Key 是否正确
- 网络连接是否正常
- 是否需要配置服务器域名白名单

### Q3: 借阅失败？
**A**: 检查以下几点：
- 是否已登录
- 图书库存是否充足
- 借阅数量是否已达上限（5 本）

### Q4: 想要微信登录？
**A**: 当前版本使用邮箱密码登录。如需微信登录，需要：
- 开发注册页面
- 集成微信 OAuth
- 或使用 Supabase Custom Auth

---

## 📚 功能清单

### 已完成 ✅
- [x] 用户登录（邮箱密码）
- [x] 图书列表展示
- [x] 图书搜索
- [x] 分类筛选
- [x] 图书详情查看
- [x] 图书借阅
- [x] 我的借阅
- [x] 图书归还
- [x] 个人中心
- [x] 退出登录

### 待开发 ⏳
- [ ] 用户注册页面
- [ ] 密码重置功能
- [ ] 借阅历史
- [ ] 管理员功能
- [ ] 图书封面上传
- [ ] 逾期消息推送
- [ ] 统计报表

---

## 📞 技术支持

### Supabase 文档
- https://supabase.com/docs

### 微信小程序文档
- https://developers.weixin.qq.com/miniprogram/dev/framework/

### 项目文档
- CloudBase到Supabase迁移指南.md - 详细迁移文档

---

## 🎉 开始使用

1. **创建用户**: 在 Supabase Dashboard 创建测试用户
2. **打开项目**: 在微信开发者工具中导入项目
3. **登录测试**: 使用邮箱密码登录
4. **功能测试**: 测试浏览、借阅、还书等功能

祝您使用愉快！📚✨

---

**版本**: v2.0.0 (Supabase 版本)
**更新日期**: 2024-01-07
