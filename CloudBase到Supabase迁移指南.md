# 🔄 CloudBase 到 Supabase 迁移指南

## ✅ 迁移已完成！

您的微信小程序图书管理系统已成功从 CloudBase 迁移到 Supabase。

---

## 📋 已完成的迁移工作

### 1. 数据库迁移 ✅

**Supabase 数据库表结构（PostgreSQL）：**

#### users 表
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  openid VARCHAR(255) UNIQUE,
  username VARCHAR(100),
  real_name VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(255),
  user_type VARCHAR(20) DEFAULT 'reader',
  is_active BOOLEAN DEFAULT true,
  max_borrow_limit INTEGER DEFAULT 5,
  borrow_count INTEGER DEFAULT 0,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

#### books 表
```sql
CREATE TABLE books (
  id UUID PRIMARY KEY,
  isbn VARCHAR(20) UNIQUE,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  publisher VARCHAR(255),
  publish_date DATE,
  category VARCHAR(50),
  price DECIMAL(10,2),
  total_stock INTEGER DEFAULT 0,
  available_stock INTEGER DEFAULT 0,
  description TEXT,
  cover_url TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

#### borrow_records 表
```sql
CREATE TABLE borrow_records (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  book_id UUID REFERENCES books(id),
  username VARCHAR(100),
  book_title VARCHAR(255),
  book_author VARCHAR(255),
  borrow_date TIMESTAMP,
  return_date TIMESTAMP,
  due_date TIMESTAMP,
  status VARCHAR(20) DEFAULT 'borrowing',
  fine DECIMAL(10,2) DEFAULT 0,
  remark TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

#### categories 表
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY,
  name VARCHAR(100) UNIQUE,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### 2. 数据迁移 ✅

已导入的示例数据：
- **分类**: 5 个（文学、科技、历史、艺术、哲学）
- **图书**: 6 本

### 3. 小程序前端改造 ✅

#### 创建的新文件
- `miniprogram/utils/api.js` - Supabase API 封装
- `miniprogram/pages/login-supabase/` - 新的登录页面（邮箱密码登录）

#### 修改的文件
- `miniprogram/app.js` - 移除 CloudBase 初始化
- `miniprogram/app.json` - 更新页面路由
- `miniprogram/pages/index/index.js` - 使用 Supabase API
- `miniprogram/pages/book-detail/book-detail.js` - 使用 Supabase API
- `miniprogram/pages/my-borrow/my-borrow.js` - 使用 Supabase API
- `miniprogram/pages/profile/profile.js` - 更新登录跳转

---

## 🔄 主要变更

### 数据库变更

| CloudBase (MongoDB) | Supabase (PostgreSQL) |
|---------------------|----------------------|
| `_id: ObjectId` | `id: UUID` |
| `createTime: Date` | `created_at: TIMESTAMP` |
| `updateTime: Date` | `updated_at: TIMESTAMP` |
| `openid: String` | `openid: VARCHAR(255)` |
| `totalStock: Number` | `total_stock: INTEGER` |
| `availableStock: Number` | `available_stock: INTEGER` |

### 认证方式变更

| CloudBase | Supabase |
|-----------|-----------|
| 微信一键登录 | 邮箱密码登录 |
| wx.login() | Supabase Auth API |
| 云函数登录 | REST API 登录 |

### API 调用方式变更

#### CloudBase 方式
```javascript
const res = await wx.cloud.callFunction({
  name: 'book',
  data: { action: 'list' }
})
```

#### Supabase 方式
```javascript
const api = require('../../utils/api.js')
const books = await api.getBooks()
```

---

## 📱 登录说明

由于 Supabase 不直接支持微信登录，现在使用**邮箱密码登录**：

### 新用户注册流程
1. 访问 Supabase Dashboard
2. 进入 "Authentication" → "Users"
3. 手动添加用户（邮箱 + 密码）

### 用户登录流程
1. 打开小程序
2. 进入"我的"标签
3. 点击"立即登录"
4. 输入邮箱和密码
5. 点击"登录"

---

## ⚠️ 重要提示

### 1. 微信登录限制
- Supabase 不直接支持微信登录
- 如需微信登录，需要：
  - 使用 Supabase Custom Auth
  - 或使用第三方服务（如 Authing）

### 2. 云函数替代方案
CloudBase 云函数已改为：
- **Supabase REST API**（直接调用）
- 或 **Supabase Edge Functions**（如需要后端逻辑）

### 3. 数据访问方式
- CloudBase: 云数据库 + 云函数
- Supabase: PostgreSQL + REST API

---

## 🚀 如何使用

### 1. 在微信开发者工具中打开项目

1. 打开微信开发者工具
2. 导入项目目录：`c:\Users\王博\Desktop\图书管理系统2`
3. 填写 AppID
4. 点击"新建"

### 2. 测试功能

#### 浏览图书
- 首页展示所有图书
- 可以按分类筛选
- 支持搜索

#### 登录
- 需要先在 Supabase 创建用户
- 使用邮箱和密码登录

#### 借阅图书
- 登录后可以借阅
- 借阅上限：5 本
- 借阅期限：30 天

#### 我的借阅
- 查看当前借阅
- 一键归还

---

## 🔧 配置说明

### Supabase 连接信息

已配置在 `miniprogram/utils/api.js`：
```javascript
const SUPABASE_URL = 'https://yajnakyuxvfhxtwwroaz.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
```

### 数据库访问权限

Supabase 使用 RLS (Row Level Security)：
- 默认允许所有读取操作
- 写入操作需要认证

---

## 📊 性能对比

| 特性 | CloudBase | Supabase |
|-----|-----------|-----------|
| 数据库 | MongoDB | PostgreSQL |
| 实时同步 | ✅ 原生支持 | ✅ 支持（需配置） |
| 云函数 | ✅ 原生支持 | ⚠️ Edge Functions |
| 微信登录 | ✅ 原生支持 | ❌ 需第三方 |
| 数据导出 | ✅ 支持 | ✅ 支持 |
| 成本 | 免费额度 | 免费额度 |
| 社区支持 | 微信官方 | 开源社区 |

---

## 🔄 回滚到 CloudBase

如果需要回滚到 CloudBase：

1. 恢复 `miniprogram/app.js` 中的 CloudBase 初始化代码
2. 恢复各个页面的云函数调用
3. 恢复 `miniprogram/app.json` 中的登录页面路由
4. 删除 `miniprogram/utils/api.js`
5. 删除 `miniprogram/pages/login-supabase/` 文件夹

---

## 📞 技术支持

### Supabase 官方文档
- https://supabase.com/docs
- https://supabase.com/docs/guides/auth

### 微信小程序文档
- https://developers.weixin.qq.com/miniprogram/dev/framework/

---

## ✅ 迁移检查清单

- [x] 创建 Supabase 数据库表
- [x] 导入示例数据
- [x] 创建 Supabase API 封装
- [x] 创建新的登录页面
- [x] 修改首页（使用 Supabase API）
- [x] 修改图书详情页（使用 Supabase API）
- [x] 修改我的借阅页（使用 Supabase API）
- [x] 修改个人中心（更新登录跳转）
- [x] 更新 app.js（移除 CloudBase）
- [x] 更新 app.json（更新路由）
- [ ] 在 Supabase 创建测试用户
- [ ] 完整功能测试
- [ ] 修复潜在问题

---

## 🎯 下一步优化

### 建议的功能增强

1. **用户注册页面**
   - 创建注册页面
   - 邮箱验证
   - 密码强度检查

2. **密码重置功能**
   - 邮箱密码重置
   - 安全问题验证

3. **JWT Token 管理**
   - 自动刷新 Token
   - Token 过期处理

4. **错误处理优化**
   - 网络错误提示
   - 数据加载状态
   - 重试机制

5. **性能优化**
   - 请求缓存
   - 图片懒加载
   - 分页优化

---

## 📝 更新日志

### v2.0.0 (2024-01-07)
- ✅ 从 CloudBase 迁移到 Supabase
- ✅ 使用 PostgreSQL 替代 MongoDB
- ✅ 使用 REST API 替代云函数
- ✅ 实现邮箱密码登录
- ✅ 更新所有页面以使用 Supabase

---

**迁移完成！** 🎉

现在您的微信小程序已经使用 Supabase 作为后端。
