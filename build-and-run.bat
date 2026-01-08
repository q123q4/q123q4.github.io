@echo off
chcp 65001 >nul
echo ========================================
echo 图书管理系统 - 完整构建并运行
echo ========================================
echo.

REM 清理、编译、打包并运行
call mvn clean package
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 构建失败
    pause
    exit /b 1
)

echo.
echo [信息] 构建成功，启动应用程序...
echo.

REM 使用java命令运行（需要配置JavaFX模块路径）
REM 注意：这种方式需要单独下载JavaFX SDK
REM 推荐使用 mvn javafx:run 方式

call mvn javafx:run

pause


