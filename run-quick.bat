@echo off
chcp 65001 >nul
echo ========================================
echo 图书管理系统 - 快速启动
echo ========================================
echo.

REM 直接运行，不重新编译
call mvn javafx:run

pause


