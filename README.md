# 图书管理系统

基于 Java + JavaFX + SQLite 开发的桌面端图书管理系统，适用于小型图书馆或个人图书管理。

## 技术栈

- **开发语言**: Java 11
- **界面框架**: JavaFX 17
- **数据库**: SQLite 3.40
- **构建工具**: Maven
- **Excel处理**: Apache POI 5.2

## 功能特性

### 核心功能模块

1. **图书信息管理**
   - 图书的增删改查
   - 图书分类管理
   - 库存管理（总库存、可借库存）
   - 多条件搜索（书名、作者、ISBN、分类）
   - Excel批量导入/导出

2. **用户信息管理**（管理员权限）
   - 用户账号创建（管理员/读者）
   - 用户信息维护
   - 账号冻结/解冻
   - 用户搜索

3. **借还书管理**
   - 借阅登记
   - 归还登记
   - 逾期提醒
   - 罚款计算
   - 借阅限额控制

4. **借阅记录查询**
   - 多条件查询（借阅人、图书、状态、日期范围）
   - 逾期记录查询
   - 个人借阅记录查询

5. **系统辅助管理**（管理员权限）
   - 操作日志查询
   - 数据备份/恢复
   - 系统参数配置

## 项目结构

```
图书管理系统2/
├── pom.xml                          # Maven配置文件
├── README.md                        # 项目说明文档
├── src/
│   └── main/
│       ├── java/
│       │   └── com/library/
│       │       ├── LibraryApplication.java    # 主程序入口
│       │       ├── config/
│       │       │   └── Config.java           # 系统配置
│       │       ├── model/                    # 实体类
│       │       │   ├── Book.java
│       │       │   ├── User.java
│       │       │   ├── BorrowRecord.java
│       │       │   └── SystemLog.java
│       │       ├── dao/                      # 数据访问层
│       │       │   ├── BookDao.java
│       │       │   ├── UserDao.java
│       │       │   ├── BorrowRecordDao.java
│       │       │   └── SystemLogDao.java
│       │       ├── service/                  # 业务逻辑层
│       │       │   ├── BookService.java
│       │       │   ├── UserService.java
│       │       │   └── BorrowService.java
│       │       ├── util/                     # 工具类
│       │       │   ├── DatabaseUtil.java
│       │       │   ├── ExcelUtil.java
│       │       │   └── BackupUtil.java
│       │       └── ui/                       # 界面层
│       │           ├── LoginController.java
│       │           ├── MainController.java
│       │           └── views/
│       │               ├── BookManagementView.java
│       │               ├── BookSearchView.java
│       │               ├── UserManagementView.java
│       │               ├── BorrowManagementView.java
│       │               ├── BorrowRecordView.java
│       │               └── SystemLogView.java
│       └── resources/
│           └── fxml/
│               ├── Login.fxml
│               └── Main.fxml
├── data/                              # 数据库文件目录（自动创建）
│   └── library.db
└── backup/                            # 备份文件目录（自动创建）
```

## 环境要求

- JDK 11 或更高版本
- Maven 3.6 或更高版本
- IntelliJ IDEA 或 Eclipse（推荐 IntelliJ IDEA）

## 快速开始

### 1. 克隆项目

```bash
git clone <项目地址>
cd 图书管理系统2
```

### 2. 运行项目

#### 方式一：使用批处理脚本（推荐，Windows）

项目提供了多个批处理脚本，双击运行即可：

- **`run.bat`** - 完整启动脚本（推荐）
  - 自动检查 Maven 和 Java 环境
  - 自动编译项目
  - 启动应用程序
  
- **`run-quick.bat`** - 快速启动
  - 不重新编译，直接运行
  - 适用于已编译过的项目
  
- **`test.bat`** - 测试脚本
  - 检查环境配置
  - 编译并运行
  - 显示详细错误信息

- **`build-and-run.bat`** - 完整构建并运行
  - 清理、编译、打包
  - 运行应用程序

**使用方法**：
```cmd
# 在项目根目录下双击 run.bat 或在命令行执行：
run.bat
```

#### 方式二：使用 Maven 命令

```bash
# 编译并运行
mvn clean compile javafx:run

# 或分步执行
mvn clean compile
mvn javafx:run
```

#### 方式三：使用 IDE 运行

1. 在 IntelliJ IDEA 中打开项目
2. 等待 Maven 自动下载依赖
3. 运行 `LibraryApplication` 类的 `main` 方法

#### 方式四：打包后运行

```bash
# 打包
mvn clean package

# 运行（需要配置 JavaFX 模块路径）
java --module-path <javafx-sdk-path>/lib --add-modules javafx.controls,javafx.fxml -cp target/library-management-system-1.0.0.jar com.library.LibraryApplication
```

### 4. 默认账号

系统首次运行会自动创建默认管理员账号：

- **用户名**: `admin`
- **密码**: `admin123`

**重要**: 首次登录后请及时修改密码！

## 使用说明

### 管理员功能

管理员拥有所有功能权限：

1. **图书管理**: 可以添加、修改、删除图书，支持Excel导入导出
2. **用户管理**: 可以创建、修改、删除用户，冻结/解冻账号
3. **借还管理**: 可以处理所有用户的借还书操作
4. **系统管理**: 可以查看操作日志，进行数据备份/恢复

### 读者功能

读者拥有以下功能权限：

1. **图书查询**: 可以搜索和查看图书信息
2. **借阅管理**: 可以查看自己的借阅记录
3. **个人信息**: 可以修改个人信息（需管理员授权）

### Excel 导入导出

#### 导出图书数据

1. 打开"图书信息管理"界面
2. 点击菜单"图书管理" -> "导出Excel"
3. 选择保存位置和文件名
4. 导出完成

#### 导入图书数据

1. 打开"图书信息管理"界面
2. 点击菜单"图书管理" -> "导入Excel"
3. 选择Excel文件（格式需符合导出模板）
4. 导入完成

**Excel格式要求**:
- 列顺序：ISBN、书名、作者、出版社、出版日期、分类、价格、总库存、可借库存、简介
- 第一行为表头（导入时会自动跳过）
- 书名和ISBN为必填项

### 数据备份与恢复

1. **备份**: 菜单"系统管理" -> "数据备份"，系统会自动在 `backup` 目录创建备份文件
2. **恢复**: 菜单"系统管理" -> "数据恢复"，选择备份文件进行恢复

## 系统配置

系统参数可在 `Config.java` 中修改：

```java
public static final int DEFAULT_BORROW_DAYS = 30;      // 默认借阅期限（天）
public static final int DEFAULT_BORROW_LIMIT = 5;      // 默认借阅限额（本）
public static final double FINE_PER_DAY = 0.5;         // 逾期每天罚款（元）
```

## 数据库说明

- 数据库类型: SQLite（嵌入式数据库，无需单独安装）
- 数据库文件位置: `data/library.db`
- 数据库管理工具: 可使用 SQLite Studio 等工具查看和管理数据库

## 常见问题

### 1. 批处理脚本无法运行

**问题**: 双击 `.bat` 文件后窗口立即关闭

**解决方案**:
- 在命令行中运行批处理文件，查看具体错误信息
- 确保已安装 Maven 并添加到 PATH 环境变量
- 确保已安装 JDK 11+ 并添加到 PATH 环境变量

### 2. 运行时报错 "找不到 JavaFX 模块"

**解决方案**: 
- 确保使用 JDK 11 或更高版本
- 如果使用 Java 11+，JavaFX 需要单独引入（已通过 Maven 依赖配置）
- 使用 `mvn javafx:run` 命令或批处理脚本运行，Maven 插件会自动处理模块路径

### 3. Maven 下载依赖缓慢

**解决方案**:
- 配置 Maven 使用国内镜像（如阿里云镜像）
- 编辑 `%USERPROFILE%\.m2\settings.xml` 文件
- 或等待首次下载完成（只需下载一次）

### 4. 数据库文件不存在

**解决方案**: 
- 系统首次运行会自动创建数据库和表结构
- 如果数据库文件损坏，删除 `data/library.db` 文件后重新运行程序

### 5. Excel 导入失败

**解决方案**:
- 检查 Excel 文件格式是否符合要求
- 确保必填字段（书名、ISBN）不为空
- 检查日期格式是否为 `yyyy-MM-dd`

## 开发说明

### 添加新功能

1. 在 `model` 包中创建实体类
2. 在 `dao` 包中创建对应的 DAO 类
3. 在 `service` 包中创建业务逻辑类
4. 在 `ui/views` 包中创建界面视图类
5. 在 `MainController` 中添加菜单项和事件处理

### 代码规范

- 遵循 Java 命名规范
- 使用 UTF-8 编码
- 注释清晰，方法功能明确
- 异常处理完善

## 许可证

本项目仅供学习和研究使用。

## 更新日志

### v1.0.0 (2024-01-XX)
- 初始版本发布
- 实现图书管理、用户管理、借还管理等核心功能
- 支持 Excel 导入导出
- 支持数据备份恢复

## 联系方式

如有问题或建议，欢迎提交 Issue。

