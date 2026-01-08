# -*- coding: utf-8 -*-
"""
图书管理系统配置文件
"""
import os

# 项目根目录
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 数据库配置
DATABASE_PATH = os.path.join(BASE_DIR, 'data', 'library.db')
BACKUP_DIR = os.path.join(BASE_DIR, 'backup')

# 系统参数配置
DEFAULT_BORROW_DAYS = 30  # 默认借阅期限（天）
DEFAULT_BORROW_LIMIT = 5  # 默认借阅限额（本）
FINE_PER_DAY = 0.5  # 逾期每天罚款（元）

# 界面配置
WINDOW_TITLE = "图书管理系统"
WINDOW_WIDTH = 1000
WINDOW_HEIGHT = 700

# 用户类型
USER_TYPE_ADMIN = "管理员"
USER_TYPE_READER = "读者"

# 确保必要的目录存在
os.makedirs(os.path.dirname(DATABASE_PATH), exist_ok=True)
os.makedirs(BACKUP_DIR, exist_ok=True)

