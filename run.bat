@echo off
chcp 65001 >nul
echo ========================================
echo 图书管理系统 - 启动脚本
echo ========================================
echo.

REM 检查Maven是否安装
where mvn >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 未找到Maven，请先安装Maven并添加到PATH环境变量
    echo 下载地址: https://maven.apache.org/download.cgi
    pause
    exit /b 1
)

REM 检查Java是否安装
where java >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 未找到Java，请先安装JDK 11或更高版本并添加到PATH环境变量
    echo 下载地址: https://www.oracle.com/java/technologies/downloads/
    pause
    exit /b 1
)

echo [信息] 检查Java版本...
java -version
echo.

echo [信息] 开始编译项目...
call mvn clean compile
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 编译失败，请检查错误信息
    pause
    exit /b 1
)

echo.
echo [信息] 启动应用程序...
echo.
call mvn javafx:run

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [错误] 启动失败
    pause
    exit /b 1
)

pause


