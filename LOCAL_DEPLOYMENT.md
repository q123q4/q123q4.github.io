# 本地部署指南

## 🚀 快速启动

### 方法一：使用预配置脚本（推荐）

#### Windows用户
1. 双击项目根目录下的 `start.bat` 文件
2. 等待依赖安装完成
3. 浏览器会自动打开 `http://localhost:5173`

#### macOS/Linux用户
```bash
chmod +x start.sh
./start.sh
```

### 方法二：手动启动

#### 1. 安装Node.js
确保您的系统已安装 Node.js (版本 >= 16.0.0)
- 下载地址：https://nodejs.org/
- 验证安装：`node --version` 和 `npm --version`

#### 2. 安装依赖
```bash
cd "c:/Users/王博/Desktop/个人主页"
npm install
```

#### 3. 启动开发服务器
```bash
npm run dev
```

#### 4. 访问网站
打开浏览器访问：`http://localhost:5173`

## 🔧 故障排除

### 常见问题及解决方案

#### 问题1：'vite' 不是内部或外部命令
**解决方案：**
```bash
# 清理并重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# 或者使用 yarn
npm install -g yarn
yarn install
yarn dev
```

#### 问题2：权限错误 (EPERM/EBUSY)
**解决方案：**
```bash
# 以管理员身份运行PowerShell
# 或者关闭可能占用文件的程序
# 重启计算机后重试

# Windows用户，可以尝试：
npm install --no-optional
```

#### 问题3：端口被占用
**解决方案：**
```bash
# 查看占用端口的进程
netstat -ano | findstr :5173
# 结束进程
taskkill /PID <进程ID> /F

# 或者使用其他端口
npm run dev -- --port 3000
```

#### 问题4：依赖安装失败
**解决方案：**
```bash
# 清理缓存
npm cache clean --force
# 删除node_modules
rm -rf node_modules
# 重新安装
npm install --verbose
```

## 🌐 本地访问链接

### 开发环境
- **主页面**: http://localhost:5173
- **首页**: http://localhost:5173/
- **关于我**: http://localhost:5173/about
- **作品集**: http://localhost:5173/portfolio
- **服务/技能**: http://localhost:5173/services
- **博客**: http://localhost:5173/blog
- **留言板**: http://localhost:5173/guestbook
- **联系我**: http://localhost:5173/contact

### 生产环境预览
```bash
# 构建项目
npm run build

# 启动预览服务器
npm run preview
```
访问：http://localhost:4173

## 📱 移动设备访问

### 在同一网络下的其他设备访问
1. 确保设备和开发机在同一WiFi网络
2. 找到开发机的IP地址：
   ```bash
   ipconfig (Windows)
   ifconfig (macOS/Linux)
   ```
3. 在移动设备浏览器中访问：
   ```
   http://[IP地址]:5173
   ```

### 使用手机热点
1. 在手机开启热点
2. 电脑连接手机热点
3. 手机访问 http://localhost:5173

## 🛠️ 高级配置

### 自定义端口
```bash
# 使用指定端口启动
npm run dev -- --port 3000
npm run dev -- --host 0.0.0.0 --port 3000
```

### 允许外部访问
```bash
# 允许局域网访问
npm run dev -- --host 0.0.0.0
```

### HTTPS开发
```bash
# 使用HTTPS启动
npm run dev -- --https
```

## 📊 性能监控

### 开发工具
- 浏览器开发者工具 (F12)
- React DevTools 扩展
- Vue DevTools 扩展 (如果使用Vue)

### 网络监控
```bash
# 安装网络监控工具
npm install -g lighthouse
lighthouse http://localhost:5173 --view
```

## 🔄 热重载

开发服务器支持热重载功能：
- 修改代码后自动刷新页面
- CSS更改立即生效
- 状态在开发时保持

## 📝 日志和调试

### 查看开发日志
```bash
npm run dev -- --debug
```

### 构建分析
```bash
npm run build -- --analyze
```

## 🚀 部署到生产环境

### 构建优化
```bash
# 生产构建
npm run build

# 构建分析
npm run build -- --analyze
```

### 部署到静态服务器
构建完成后，`dist` 文件夹包含所有静态文件，可以部署到：
- Nginx
- Apache
- Vercel
- Netlify
- GitHub Pages
- 任何静态文件服务器

## 🎯 快速测试

如果遇到任何问题，可以直接打开 `index.html` 文件在浏览器中查看静态版本（某些功能可能受限）。

## 📞 技术支持

如果仍然遇到问题：
1. 检查 Node.js 版本：`node --version`
2. 检查 npm 版本：`npm --version`
3. 清理缓存：`npm cache clean --force`
4. 重新克隆项目到新的文件夹
5. 确保有足够的磁盘空间
6. 检查防火墙和杀毒软件设置

---

## 🎉 成功标志

当您看到以下内容时，说明部署成功：

```
  VITE v5.0.0  ready in 328 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

现在您可以在浏览器中访问您的个人主页了！🎊

---

**提示**: 建议使用现代浏览器（Chrome、Firefox、Safari、Edge）以获得最佳体验。