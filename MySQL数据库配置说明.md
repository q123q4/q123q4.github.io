# MySQL数据库配置说明

## 数据库结构适配完成

系统已成功适配您提供的MySQL数据库结构。

## 数据库配置

请在 `src/main/java/com/library/config/Config.java` 中修改以下配置：

```java
public static final String DB_TYPE = "mysql";  // 设置为 "mysql"
public static final String MYSQL_HOST = "localhost";
public static final String MYSQL_PORT = "3306";
public static final String MYSQL_DATABASE = "book_manager";
public static final String MYSQL_USERNAME = "root";      // 修改为您的MySQL用户名
public static final String MYSQL_PASSWORD = "root";      // 修改为您的MySQL密码
```

## 表结构映射

### 1. book_info → books
- `bookId` → `id`
- `bookName` → `title`
- `bookAuthor` → `author`
- `bookPrice` → `price`
- `bookTypeId` → 通过 `book_type` 表关联
- `bookDesc` → `description`
- `isBorrowed` → 用于判断是否可借（0=可借，1=已借出）

### 2. book_type → category
- 独立的分类表，通过 `bookTypeId` 关联
- `bookTypeName` 作为分类名称

### 3. user → users
- `userId` → `id`
- `userName` → `username`
- `userPassword` → `password`
- `isAdmin` → `userType` (1=管理员，0=读者)

### 4. borrow → borrow_records
- `borrowId` → `id`
- `userId` → `user_id`
- `bookId` → `book_id`
- `borrowTime` → `borrow_date`
- `returnTime` → `return_date`
- `due_date` → 计算得出（借阅时间+30天）
- `status` → 根据 `returnTime` 判断（NULL=借阅中，NOT NULL=已归还）

## 使用说明

1. **确保MySQL服务已启动**
2. **导入数据库**：执行您提供的 `book_manager.sql` 文件
3. **修改配置**：在 `Config.java` 中设置正确的数据库连接信息
4. **运行应用**：使用 `run.bat` 或直接运行程序

## 注意事项

1. **系统日志表**：MySQL数据库中没有 `system_logs` 表，系统会使用空实现（不记录日志）
2. **系统参数表**：MySQL数据库中没有 `system_config` 表，系统使用代码中的默认配置
3. **库存管理**：MySQL数据库使用 `isBorrowed` 字段（0/1）来标记单本书的借出状态，而不是库存数量
4. **分类管理**：分类存储在独立的 `book_type` 表中，系统会自动处理分类的创建和关联

## 测试账号

根据您提供的SQL文件，默认账号：
- 管理员：`admin` / `admin`
- 普通用户：`user` / `123456`

## 切换回SQLite

如果需要切换回SQLite，只需在 `Config.java` 中设置：
```java
public static final String DB_TYPE = "sqlite";
```


