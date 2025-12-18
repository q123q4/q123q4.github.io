@echo off
title 启动个人主页网站

echo 🚀 启动个人主页网站...

REM 检查Node.js是否安装
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 错误：请先安装 Node.js
    pause
    exit /b 1
)

REM 检查npm是否可用
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 错误：npm 不可用
    pause
    exit /b 1
)

REM 安装依赖
echo 📦 安装依赖...
call npm install

REM 启动开发服务器
echo 🌐 启动开发服务器...
call npm run dev

echo ✅ 开发服务器已启动！
echo 🔗 访问地址：http://localhost:5173
pause