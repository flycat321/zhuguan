# 筑管 ZhuGuan

建筑设计院内部项目管理系统

## 功能

- **进度看板** — 全所项目红黄绿灯状态一览，卡片/表格视图切换
- **项目管理** — 项目台账 CRUD，设计节点、项目成员、项目备注
- **工作记录** — 员工按日记录工时和工作内容
- **工作负荷** — 管理员查看全员参与项目数和本周工时（偏闲/正常/偏忙）
- **周报汇总** — 管理员按员工查看本周工作汇总
- **权限管理** — ADMIN / MEMBER 角色区分，非管理员不可见管理功能

## 技术栈

- Next.js 16 (App Router, Turbopack)
- PostgreSQL 14+ (Prisma 7 ORM)
- NextAuth.js v5 (Credentials + JWT)
- shadcn/ui + Tailwind CSS 4
- TypeScript, Zod, date-fns

## 快速开始

### 1. 环境准备

- Node.js 22+
- PostgreSQL 14+（本地 Homebrew 或 Docker）

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env，设置 DATABASE_URL 和 NEXTAUTH_SECRET
```

**本地 Homebrew PostgreSQL：**

```bash
brew services start postgresql@14
createdb zhuguan
# DATABASE_URL="postgresql://你的用户名@localhost:5432/zhuguan?schema=public"
```

**Docker Compose：**

```bash
docker compose up -d
# DATABASE_URL="postgresql://zhuguan:zhuguan_dev@localhost:5432/zhuguan?schema=public"
```

### 4. 初始化数据库

```bash
npx prisma generate
npx prisma migrate dev
npm run db:seed
```

### 5. 启动

```bash
npm run dev
# 访问 http://localhost:3000
```

## 默认账号

| 角色 | 用户名 | 密码 |
|------|--------|------|
| 管理员 | guogaoliang | admin123 |
| 普通成员 | zhangmingyuan | member123 |
| 普通成员 | lijianguo | member123 |

其他成员账号密码均为 `member123`。

## 常用命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 生产构建
npm run db:seed      # 重新写入示例数据
npm run db:studio    # 打开 Prisma Studio 查看数据
npm run db:migrate   # 运行数据库迁移
```

## 项目结构

```
src/
├── app/
│   ├── (auth)/login/        # 登录页
│   ├── (main)/              # 需登录的页面
│   │   ├── dashboard/       # 进度看板
│   │   ├── projects/        # 项目管理
│   │   ├── worklog/         # 工作记录
│   │   └── admin/           # 管理员功能
│   │       ├── users/       # 用户管理
│   │       ├── workload/    # 工作负荷
│   │       └── weekly/      # 周报汇总
│   └── api/                 # API 路由
├── components/
│   ├── layout/              # 布局组件（侧边栏）
│   ├── projects/            # 项目相关组件
│   └── ui/                  # shadcn/ui 组件
└── lib/                     # 工具库（Prisma、Auth、常量）
```

## 设计风格

采用「空间光影」设计方案：

- 暖白背景 `#faf9f7`
- 紫色主色 `#6c5ce7` 渐变色系
- 大圆角 (16-20px)
- 弹性悬浮动画
- 柔和阴影
