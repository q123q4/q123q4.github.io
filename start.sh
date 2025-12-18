#!/bin/bash

echo "🚀 启动个人主页网站..."

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误：请先安装 Node.js"
    exit 1
fi

# 检查npm是否可用
if ! command -v npm &> /dev/null; then
    echo "❌ 错误：npm 不可用"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm install

# 启动开发服务器
echo "🌐 启动开发服务器..."
npm run dev

echo "✅ 开发服务器已启动！"
echo "🔗 访问地址：http://localhost:5173"