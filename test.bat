@echo off
chcp 65001 >nul
echo ========================================
echo 图书管理系统 - 测试脚本
echo ========================================
echo.

echo [步骤1] 检查环境...
echo.

REM 检查Maven
where mvn >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [×] Maven 未安装
    set MAVEN_OK=0
) else (
    echo [√] Maven 已安装
    mvn -version | findstr "Apache Maven"
    set MAVEN_OK=1
)

echo.

REM 检查Java
where java >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [×] Java 未安装
    set JAVA_OK=0
) else (
    echo [√] Java 已安装
    java -version 2>&1 | findstr "version"
    set JAVA_OK=1
)

echo.

REM 检查项目文件
if exist "pom.xml" (
    echo [√] pom.xml 存在
) else (
    echo [×] pom.xml 不存在
    set PROJECT_OK=0
)

if exist "src\main\java\com\library\LibraryApplication.java" (
    echo [√] 主程序文件存在
) else (
    echo [×] 主程序文件不存在
    set PROJECT_OK=0
)

echo.
echo [步骤2] 编译项目...
echo.

if %MAVEN_OK%==1 if %JAVA_OK%==1 (
    call mvn clean compile -q
    if %ERRORLEVEL% EQU 0 (
        echo [√] 编译成功
        echo.
        echo [步骤3] 运行应用...
        echo.
        call mvn javafx:run
    ) else (
        echo [×] 编译失败，请检查错误信息
        echo.
        echo 尝试详细编译信息:
        call mvn clean compile
    )
) else (
    echo [×] 环境检查失败，无法继续
)

echo.
pause


