import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { UserRole, ProjectPhase, ProjectStatus } from "../src/generated/prisma/enums.js";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  // ==================== 用户 ====================
  const adminPassword = await bcrypt.hash("admin123", 10);
  const memberPassword = await bcrypt.hash("member123", 10);

  const admin = await prisma.user.upsert({
    where: { username: "guogaoliang" },
    update: {},
    create: {
      username: "guogaoliang",
      password: adminPassword,
      name: "郭高亮",
      role: UserRole.ADMIN,
      phone: "18629148762",
      department: "医疗健康设计部",
      position: "副总建筑师、部长",
      isActive: true,
    },
  });

  const zhangmingyuan = await prisma.user.upsert({
    where: { username: "zhangmingyuan" },
    update: {},
    create: {
      username: "zhangmingyuan",
      password: memberPassword,
      name: "张明远",
      role: UserRole.PROJECT_LEAD,
      department: "医疗健康设计部",
      position: "建筑专业负责人",
      isActive: true,
    },
  });

  const lijianguo = await prisma.user.upsert({
    where: { username: "lijianguo" },
    update: {},
    create: {
      username: "lijianguo",
      password: memberPassword,
      name: "李建国",
      role: UserRole.PROJECT_LEAD,
      department: "医疗健康设计部",
      position: "建筑专业负责人",
      isActive: true,
    },
  });

  const wangxiaofeng = await prisma.user.upsert({
    where: { username: "wangxiaofeng" },
    update: {},
    create: {
      username: "wangxiaofeng",
      password: memberPassword,
      name: "王晓峰",
      role: UserRole.MEMBER,
      department: "医疗健康设计部",
      position: "建筑师",
      isActive: true,
    },
  });

  const zhaopengfei = await prisma.user.upsert({
    where: { username: "zhaopengfei" },
    update: {},
    create: {
      username: "zhaopengfei",
      password: memberPassword,
      name: "赵鹏飞",
      role: UserRole.MEMBER,
      department: "医疗健康设计部",
      position: "结构工程师",
      isActive: true,
    },
  });

  const chensiyuan = await prisma.user.upsert({
    where: { username: "chensiyuan" },
    update: {},
    create: {
      username: "chensiyuan",
      password: memberPassword,
      name: "陈思远",
      role: UserRole.MEMBER,
      department: "医疗健康设计部",
      position: "给排水工程师",
      isActive: true,
    },
  });

  const liuwei = await prisma.user.upsert({
    where: { username: "liuwei" },
    update: {},
    create: {
      username: "liuwei",
      password: memberPassword,
      name: "刘薇",
      role: UserRole.MEMBER,
      department: "医疗健康设计部",
      position: "暖通工程师",
      isActive: true,
    },
  });

  const users = [admin, zhangmingyuan, lijianguo, wangxiaofeng, zhaopengfei, chensiyuan, liuwei];

  // ==================== 项目 ====================
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        name: "西安市中心医院门急诊综合楼",
        contractNo: "CNWD-2025-001",
        contractAmount: 680,
        clientName: "西安市卫健委",
        clientContact: "王主任",
        projectType: "医疗",
        phase: ProjectPhase.CONSTRUCTION,
        status: ProjectStatus.ACTIVE,
        startDate: new Date("2025-06-01"),
        endDate: new Date("2026-06-30"),
        leadId: zhangmingyuan.id,
        description: "新建门急诊综合楼，地上12层，地下2层，建筑面积约4.5万平方米",
        address: "西安市碑林区",
        buildingArea: 45000,
      },
    }),
    prisma.project.create({
      data: {
        name: "咸阳市第一人民医院住院楼改造",
        contractNo: "CNWD-2025-002",
        contractAmount: 320,
        clientName: "咸阳市第一人民医院",
        clientContact: "刘院长",
        projectType: "医疗",
        phase: ProjectPhase.PRELIMINARY,
        status: ProjectStatus.ACTIVE,
        startDate: new Date("2025-09-01"),
        endDate: new Date("2026-05-31"),
        leadId: lijianguo.id,
        description: "既有住院楼改造升级，涉及结构加固、功能优化和设备更新",
        address: "咸阳市秦都区",
        buildingArea: 18000,
      },
    }),
    prisma.project.create({
      data: {
        name: "宝鸡市妇幼保健院新建工程",
        contractNo: "CNWD-2025-003",
        contractAmount: 520,
        clientName: "宝鸡市卫健委",
        clientContact: "张处长",
        projectType: "医疗",
        phase: ProjectPhase.SCHEME,
        status: ProjectStatus.ACTIVE,
        startDate: new Date("2026-01-15"),
        endDate: new Date("2026-12-31"),
        leadId: wangxiaofeng.id,
        description: "新建妇幼保健院，包含产科、儿科、妇科等，床位500张",
        address: "宝鸡市金台区",
        buildingArea: 35000,
      },
    }),
    prisma.project.create({
      data: {
        name: "延安大学附属医院科研楼",
        contractNo: "CNWD-2025-004",
        contractAmount: 890,
        clientName: "延安大学",
        clientContact: "赵副校长",
        projectType: "医疗",
        phase: ProjectPhase.CONSTRUCTION,
        status: ProjectStatus.ACTIVE,
        startDate: new Date("2025-03-01"),
        endDate: new Date("2026-05-15"),
        leadId: admin.id,
        description: "科研教学综合楼，含实验室、学术报告厅、办公区，地上8层",
        address: "延安市宝塔区",
        buildingArea: 28000,
      },
    }),
    prisma.project.create({
      data: {
        name: "铜川市中医医院门诊楼",
        contractNo: "CNWD-2024-015",
        contractAmount: 210,
        clientName: "铜川市卫健委",
        clientContact: "李科长",
        projectType: "医疗",
        phase: ProjectPhase.COMPLETION,
        status: ProjectStatus.ACTIVE,
        startDate: new Date("2024-08-01"),
        endDate: new Date("2026-04-30"),
        leadId: zhaopengfei.id,
        description: "中医特色门诊楼，融合传统建筑元素，地上5层",
        address: "铜川市耀州区",
        buildingArea: 12000,
      },
    }),
    prisma.project.create({
      data: {
        name: "榆林市人民医院传染病区",
        contractNo: "CNWD-2025-005",
        contractAmount: 450,
        clientName: "榆林市人民医院",
        clientContact: "孙书记",
        projectType: "医疗",
        phase: ProjectPhase.PRELIMINARY,
        status: ProjectStatus.ACTIVE,
        startDate: new Date("2025-11-01"),
        endDate: new Date("2026-08-31"),
        leadId: chensiyuan.id,
        description: "独立传染病区，含负压病房、PCR实验室，严格院感设计",
        address: "榆林市榆阳区",
        buildingArea: 15000,
      },
    }),
  ]);

  // ==================== 项目成员 ====================
  const memberAssignments = [
    // 项目0: 西安市中心医院
    { projectIdx: 0, userId: zhangmingyuan.id, role: "建筑专业负责人" },
    { projectIdx: 0, userId: zhaopengfei.id, role: "结构设计" },
    { projectIdx: 0, userId: chensiyuan.id, role: "给排水设计" },
    { projectIdx: 0, userId: liuwei.id, role: "暖通设计" },
    // 项目1: 咸阳住院楼
    { projectIdx: 1, userId: lijianguo.id, role: "建筑专业负责人" },
    { projectIdx: 1, userId: wangxiaofeng.id, role: "建筑设计" },
    { projectIdx: 1, userId: zhaopengfei.id, role: "结构加固设计" },
    // 项目2: 宝鸡妇幼
    { projectIdx: 2, userId: wangxiaofeng.id, role: "建筑专业负责人" },
    { projectIdx: 2, userId: liuwei.id, role: "暖通设计" },
    // 项目3: 延安科研楼
    { projectIdx: 3, userId: admin.id, role: "项目总负责" },
    { projectIdx: 3, userId: zhangmingyuan.id, role: "建筑设计" },
    { projectIdx: 3, userId: chensiyuan.id, role: "给排水设计" },
    // 项目4: 铜川中医
    { projectIdx: 4, userId: zhaopengfei.id, role: "结构设计" },
    { projectIdx: 4, userId: liuwei.id, role: "暖通设计" },
    // 项目5: 榆林传染病区
    { projectIdx: 5, userId: chensiyuan.id, role: "给排水专业负责人" },
    { projectIdx: 5, userId: lijianguo.id, role: "建筑设计" },
  ];

  for (const m of memberAssignments) {
    await prisma.projectMember.create({
      data: {
        projectId: projects[m.projectIdx].id,
        userId: m.userId,
        role: m.role,
      },
    });
  }

  // ==================== 里程碑 ====================
  const now = new Date();
  const milestoneData = [
    // 项目0: 西安中心医院 - 施工图阶段
    { projectIdx: 0, phase: ProjectPhase.SCHEME, name: "方案汇报", dueDate: new Date("2025-08-15"), isCompleted: true, completedAt: new Date("2025-08-10"), assigneeId: zhangmingyuan.id, sortOrder: 1 },
    { projectIdx: 0, phase: ProjectPhase.PRELIMINARY, name: "初设评审", dueDate: new Date("2025-12-20"), isCompleted: true, completedAt: new Date("2025-12-18"), assigneeId: zhangmingyuan.id, sortOrder: 2 },
    { projectIdx: 0, phase: ProjectPhase.CONSTRUCTION, name: "施工图一版交付", dueDate: new Date("2026-04-28"), isCompleted: false, assigneeId: zhangmingyuan.id, sortOrder: 3 },
    { projectIdx: 0, phase: ProjectPhase.CONSTRUCTION, name: "施工图审查通过", dueDate: new Date("2026-05-30"), isCompleted: false, assigneeId: zhangmingyuan.id, sortOrder: 4 },
    // 项目1: 咸阳住院楼 - 初设阶段，即将到期
    { projectIdx: 1, phase: ProjectPhase.SCHEME, name: "改造方案确认", dueDate: new Date("2025-11-30"), isCompleted: true, completedAt: new Date("2025-11-28"), assigneeId: lijianguo.id, sortOrder: 1 },
    { projectIdx: 1, phase: ProjectPhase.PRELIMINARY, name: "初设文件提交", dueDate: new Date("2026-04-16"), isCompleted: false, assigneeId: lijianguo.id, sortOrder: 2 },
    // 项目2: 宝鸡妇幼 - 方案阶段，已逾期
    { projectIdx: 2, phase: ProjectPhase.SCHEME, name: "概念方案汇报", dueDate: new Date("2026-04-11"), isCompleted: false, assigneeId: wangxiaofeng.id, sortOrder: 1 },
    { projectIdx: 2, phase: ProjectPhase.SCHEME, name: "方案深化", dueDate: new Date("2026-06-30"), isCompleted: false, assigneeId: wangxiaofeng.id, sortOrder: 2 },
    // 项目3: 延安科研楼 - 施工图阶段
    { projectIdx: 3, phase: ProjectPhase.SCHEME, name: "方案评审通过", dueDate: new Date("2025-06-01"), isCompleted: true, completedAt: new Date("2025-05-28"), assigneeId: admin.id, sortOrder: 1 },
    { projectIdx: 3, phase: ProjectPhase.PRELIMINARY, name: "初设批复", dueDate: new Date("2025-10-15"), isCompleted: true, completedAt: new Date("2025-10-12"), assigneeId: admin.id, sortOrder: 2 },
    { projectIdx: 3, phase: ProjectPhase.CONSTRUCTION, name: "施工图交付", dueDate: new Date("2026-05-10"), isCompleted: false, assigneeId: admin.id, sortOrder: 3 },
    // 项目4: 铜川中医 - 竣工验收阶段
    { projectIdx: 4, phase: ProjectPhase.COMPLETION, name: "竣工验收", dueDate: new Date("2026-04-22"), isCompleted: false, assigneeId: zhaopengfei.id, sortOrder: 1 },
    // 项目5: 榆林传染病区 - 初设阶段，已逾期
    { projectIdx: 5, phase: ProjectPhase.SCHEME, name: "方案确认", dueDate: new Date("2026-02-28"), isCompleted: true, completedAt: new Date("2026-03-05"), assigneeId: chensiyuan.id, sortOrder: 1 },
    { projectIdx: 5, phase: ProjectPhase.PRELIMINARY, name: "初设中期检查", dueDate: new Date("2026-04-13"), isCompleted: false, assigneeId: chensiyuan.id, sortOrder: 2 },
  ];

  for (const m of milestoneData) {
    await prisma.milestone.create({
      data: {
        projectId: projects[m.projectIdx].id,
        phase: m.phase,
        name: m.name,
        dueDate: m.dueDate,
        isCompleted: m.isCompleted,
        completedAt: m.completedAt ?? null,
        assigneeId: m.assigneeId,
        sortOrder: m.sortOrder,
      },
    });
  }

  // ==================== 项目备注 ====================
  const noteData = [
    { projectIdx: 0, authorId: zhangmingyuan.id, content: "甲方要求门诊大厅增加自助挂号区域，面积约200平方米，需调整首层平面" },
    { projectIdx: 0, authorId: zhaopengfei.id, content: "地基勘察报告已收到，地下室底板需加厚至600mm" },
    { projectIdx: 1, authorId: lijianguo.id, content: "现场踏勘完成，原结构图纸与现状有出入，需补充测绘" },
    { projectIdx: 2, authorId: wangxiaofeng.id, content: "甲方提出增加产后康复中心功能，需与使用方进一步对接" },
    { projectIdx: 3, authorId: admin.id, content: "实验室等级调整为P2+，需增加气密性和排风设计要求" },
  ];

  for (const n of noteData) {
    await prisma.projectNote.create({
      data: {
        projectId: projects[n.projectIdx].id,
        authorId: n.authorId,
        content: n.content,
      },
    });
  }

  // ==================== 工作记录 ====================
  const today = new Date();
  const workLogData = [
    { userId: zhangmingyuan.id, projectIdx: 0, daysAgo: 0, hours: 6, content: "施工图建筑专业出图，完成三至五层平面图", category: "设计" },
    { userId: zhangmingyuan.id, projectIdx: 0, daysAgo: 1, hours: 8, content: "施工图建筑专业出图，完成一二层平面和立面", category: "设计" },
    { userId: zhaopengfei.id, projectIdx: 0, daysAgo: 0, hours: 4, content: "框架结构计算，地下室底板配筋", category: "设计" },
    { userId: zhaopengfei.id, projectIdx: 4, daysAgo: 0, hours: 3, content: "竣工资料整理，结构专业竣工图编制", category: "协调" },
    { userId: lijianguo.id, projectIdx: 1, daysAgo: 0, hours: 7, content: "初设建筑专业图纸绘制，住院部改造平面", category: "设计" },
    { userId: lijianguo.id, projectIdx: 1, daysAgo: 1, hours: 3, content: "与甲方沟通改造范围确认", category: "协调" },
    { userId: wangxiaofeng.id, projectIdx: 2, daysAgo: 0, hours: 5, content: "方案草图深化，调整功能分区", category: "设计" },
    { userId: wangxiaofeng.id, projectIdx: 2, daysAgo: 1, hours: 6, content: "参考案例研究，收集妇幼保健院设计资料", category: "设计" },
    { userId: chensiyuan.id, projectIdx: 5, daysAgo: 0, hours: 6, content: "负压病房给排水系统方案设计", category: "设计" },
    { userId: chensiyuan.id, projectIdx: 0, daysAgo: 1, hours: 4, content: "消防给水系统计算", category: "设计" },
    { userId: liuwei.id, projectIdx: 0, daysAgo: 0, hours: 5, content: "空调系统施工图，手术室净化系统", category: "设计" },
    { userId: liuwei.id, projectIdx: 4, daysAgo: 1, hours: 3, content: "暖通专业竣工图校核", category: "协调" },
    { userId: admin.id, projectIdx: 3, daysAgo: 0, hours: 4, content: "审核科研楼施工图，提出修改意见", category: "设计" },
    { userId: admin.id, projectIdx: 3, daysAgo: 1, hours: 2, content: "与延安大学基建处视频会议，确认实验室设备清单", category: "协调" },
  ];

  for (const w of workLogData) {
    const workDate = new Date(today);
    workDate.setDate(workDate.getDate() - w.daysAgo);
    workDate.setHours(9, 0, 0, 0);

    await prisma.workLog.create({
      data: {
        userId: w.userId,
        projectId: projects[w.projectIdx].id,
        date: workDate,
        hours: w.hours,
        content: w.content,
        category: w.category,
      },
    });
  }

  console.log("Seed completed successfully!");
  console.log(`Created ${users.length} users`);
  console.log(`Created ${projects.length} projects`);
  console.log(`Created ${memberAssignments.length} project members`);
  console.log(`Created ${milestoneData.length} milestones`);
  console.log(`Created ${noteData.length} project notes`);
  console.log(`Created ${workLogData.length} work logs`);
  console.log("");
  console.log("管理员账号: guogaoliang / admin123");
  console.log("普通成员账号: zhangmingyuan / member123 (其他成员密码相同)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
