#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
简单的HTTP服务器，用于本地运行个人主页
支持Python 3.7+
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# 端口配置
PORT = 8000
HOST = 'localhost'

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """自定义请求处理器，支持SPA路由"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def do_GET(self):
        # 处理SPA路由
        if self.path.startswith('/about') or self.path.startswith('/portfolio') or \
           self.path.startswith('/services') or self.path.startswith('/blog') or \
           self.path.startswith('/guestbook') or self.path.startswith('/contact'):
            self.path = '/index.html'
        
        return super().do_GET()
    
    def end_headers(self):
        # 添加CORS头部，支持本地开发
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    """主函数"""
    # 切换到项目目录
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    print("🚀 启动个人主页本地服务器...")
    print(f"📂 项目目录: {script_dir}")
    print(f"🌐 服务器地址: http://{HOST}:{PORT}")
    print("📱 移动设备访问: 使用您的IP地址替换localhost")
    print("⏹ 按 Ctrl+C 停止服务器")
    print("=" * 50)
    
    try:
        # 创建服务器
        with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
            print(f"✅ 服务器已启动在端口 {PORT}")
            print(f"🔗 访问链接: http://{HOST}:{PORT}")
            print("📖 主要页面:")
            print(f"   📄 首页: http://{HOST}:{PORT}/")
            print(f"   👤 关于我: http://{HOST}:{PORT}/about")
            print(f"   📁 作品集: http://{HOST}:{PORT}/portfolio")
            print(f"   🛠️  服务/技能: http://{HOST}:{PORT}/services")
            print(f"   📝 博客: http://{HOST}:{PORT}/blog")
            print(f"   💬 留言板: http://{HOST}:{PORT}/guestbook")
            print(f"   📧 联系我: http://{HOST}:{PORT}/contact")
            print("=" * 50)
            
            # 自动打开浏览器
            try:
                webbrowser.open(f'http://{HOST}:{PORT}')
                print("🌐 浏览器已自动打开")
            except:
                print("⚠️  无法自动打开浏览器，请手动访问上述地址")
            
            # 启动服务器
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 服务器已停止")
    except OSError as e:
        if e.errno == 10048:  # Windows端口占用错误
            print(f"❌ 端口 {PORT} 已被占用")
            print("💡 尝试使用其他端口或停止占用该端口的程序")
            print(f"   示例: python {__file____} --port 8080")
        elif e.errno == 98:  # Unix端口占用错误
            print(f"❌ 端口 {PORT} 已被占用")
            print("💡 使用 'lsof -i :{PORT}' 查看占用进程")
        else:
            print(f"❌ 启动失败: {e}")
    except Exception as e:
        print(f"❌ 未知错误: {e}")

if __name__ == "__main__":
    # 解析命令行参数
    if len(sys.argv) > 1:
        if sys.argv[1] == '--port' and len(sys.argv) > 2:
            try:
                PORT = int(sys.argv[2])
            except ValueError:
                print("❌ 端口号必须是数字")
                sys.exit(1)
        elif sys.argv[1] in ('-h', '--help'):
            print("用法:")
            print(f"  python {__file____} [--port 端口号]")
            print(f"  示例: python {__file____} --port 8080")
            print(f"  默认端口: {PORT}")
            sys.exit(0)
    
    main()