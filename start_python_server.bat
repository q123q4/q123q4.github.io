@echo off
chcp 65001 >nul
title 个人主页本地服务器

echo 🚀 启动个人主页本地服务器...
echo.

REM 检查Python是否安装
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误：未检测到Python
    echo 💡 请先安装Python：https://python.org/downloads/
    echo 📖 安装后请重启命令提示符
    pause
    exit /b 1
)

echo ✅ Python已安装
echo.

REM 切换到脚本目录
cd /d "%~dp0"

REM 启动Python服务器
echo 🌐 启动服务器...
echo 📂 项目目录: %cd%
echo 🔗 访问地址: http://localhost:8000
echo.
echo 📖 主要页面:
echo    📄 首页: http://localhost:8000/
echo    👤 关于我: http://localhost:8000/about
echo    📁 作品集: http://localhost:8000/portfolio
echo    🛠️  服务/技能: http://localhost:8000/services
echo    📝 博客: http://localhost:8000/blog
echo    💬 留言板: http://localhost:8000/guestboard
echo    📧 联系我: http://localhost:8000/contact
echo.
echo ⏹ 按 Ctrl+C 停止服务器
echo ========================================

python start_server.py

echo.
echo 🛑 服务器已停止
pause