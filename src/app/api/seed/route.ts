import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  // 安全校验：需要传入 seed secret
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 检查是否已有数据
  const userCount = await prisma.user.count();
  if (userCount > 0) {
    return NextResponse.json({ message: "Database already seeded", userCount });
  }

  const adminPassword = await bcrypt.hash("admin123", 10);
  const memberPassword = await bcrypt.hash("member123", 10);

  const admin = await prisma.user.create({
    data: {
      username: "guogaoliang",
      password: adminPassword,
      name: "郭高亮",
      role: "ADMIN",
      phone: "18629148762",
      department: "医疗健康设计部",
      position: "副总建筑师、部长",
    },
  });

  const users = await Promise.all([
    prisma.user.create({
      data: { username: "zhangmingyuan", password: memberPassword, name: "张明远", role: "PROJECT_LEAD", department: "医疗健康设计部", position: "建筑专业负责人" },
    }),
    prisma.user.create({
      data: { username: "lijianguo", password: memberPassword, name: "李建国", role: "PROJECT_LEAD", department: "医疗健康设计部", position: "建筑专业负责人" },
    }),
    prisma.user.create({
      data: { username: "wangxiaofeng", password: memberPassword, name: "王晓峰", role: "MEMBER", department: "医疗健康设计部", position: "建筑师" },
    }),
    prisma.user.create({
      data: { username: "zhaopengfei", password: memberPassword, name: "赵鹏飞", role: "MEMBER", department: "医疗健康设计部", position: "结构工程师" },
    }),
    prisma.user.create({
      data: { username: "chensiyuan", password: memberPassword, name: "陈思远", role: "MEMBER", department: "医疗健康设计部", position: "给排水工程师" },
    }),
    prisma.user.create({
      data: { username: "liuwei", password: memberPassword, name: "刘薇", role: "MEMBER", department: "医疗健康设计部", position: "暖通工程师" },
    }),
  ]);

  const [zhangmingyuan, lijianguo, wangxiaofeng, zhaopengfei, chensiyuan, liuwei] = users;

  const projects = await Promise.all([
    prisma.project.create({
      data: {
        name: "西安市中心医院门急诊综合楼", contractNo: "CNWD-2025-001", contractAmount: 680,
        clientName: "西安市卫健委", projectType: "医疗", phase: "CONSTRUCTION", status: "ACTIVE",
        startDate: new Date("2025-06-01"), endDate: new Date("2026-06-30"),
        leadId: zhangmingyuan.id, description: "新建门急诊综合楼，地上12层，地下2层", address: "西安市碑林区", buildingArea: 45000,
      },
    }),
    prisma.project.create({
      data: {
        name: "咸阳市第一人民医院住院楼改造", contractNo: "CNWD-2025-002", contractAmount: 320,
        clientName: "咸阳市第一人民医院", projectType: "医疗", phase: "PRELIMINARY", status: "ACTIVE",
        startDate: new Date("2025-09-01"), endDate: new Date("2026-05-31"),
        leadId: lijianguo.id, description: "既有住院楼改造升级", address: "咸阳市秦都区", buildingArea: 18000,
      },
    }),
    prisma.project.create({
      data: {
        name: "宝鸡市妇幼保健院新建工程", contractNo: "CNWD-2025-003", contractAmount: 520,
        clientName: "宝鸡市卫健委", projectType: "医疗", phase: "SCHEME", status: "ACTIVE",
        startDate: new Date("2026-01-15"), endDate: new Date("2026-12-31"),
        leadId: wangxiaofeng.id, description: "新建妇幼保健院，床位500张", address: "宝鸡市金台区", buildingArea: 35000,
      },
    }),
    prisma.project.create({
      data: {
        name: "延安大学附属医院科研楼", contractNo: "CNWD-2025-004", contractAmount: 890,
        clientName: "延安大学", projectType: "医疗", phase: "CONSTRUCTION", status: "ACTIVE",
        startDate: new Date("2025-03-01"), endDate: new Date("2026-05-15"),
        leadId: admin.id, description: "科研教学综合楼，含实验室", address: "延安市宝塔区", buildingArea: 28000,
      },
    }),
    prisma.project.create({
      data: {
        name: "铜川市中医医院门诊楼", contractNo: "CNWD-2024-015", contractAmount: 210,
        clientName: "铜川市卫健委", projectType: "医疗", phase: "COMPLETION", status: "ACTIVE",
        startDate: new Date("2024-08-01"), endDate: new Date("2026-04-30"),
        leadId: zhaopengfei.id, description: "中医特色门诊楼", address: "铜川市耀州区", buildingArea: 12000,
      },
    }),
    prisma.project.create({
      data: {
        name: "榆林市人民医院传染病区", contractNo: "CNWD-2025-005", contractAmount: 450,
        clientName: "榆林市人民医院", projectType: "医疗", phase: "PRELIMINARY", status: "ACTIVE",
        startDate: new Date("2025-11-01"), endDate: new Date("2026-08-31"),
        leadId: chensiyuan.id, description: "独立传染病区，含负压病房", address: "榆林市榆阳区", buildingArea: 15000,
      },
    }),
  ]);

  // 项目成员
  const memberData = [
    { pIdx: 0, userId: zhangmingyuan.id, role: "建筑专业负责人" },
    { pIdx: 0, userId: zhaopengfei.id, role: "结构设计" },
    { pIdx: 0, userId: chensiyuan.id, role: "给排水设计" },
    { pIdx: 0, userId: liuwei.id, role: "暖通设计" },
    { pIdx: 1, userId: lijianguo.id, role: "建筑专业负责人" },
    { pIdx: 1, userId: wangxiaofeng.id, role: "建筑设计" },
    { pIdx: 1, userId: zhaopengfei.id, role: "结构加固设计" },
    { pIdx: 2, userId: wangxiaofeng.id, role: "建筑专业负责人" },
    { pIdx: 2, userId: liuwei.id, role: "暖通设计" },
    { pIdx: 3, userId: admin.id, role: "项目总负责" },
    { pIdx: 3, userId: zhangmingyuan.id, role: "建筑设计" },
    { pIdx: 3, userId: chensiyuan.id, role: "给排水设计" },
    { pIdx: 4, userId: zhaopengfei.id, role: "结构设计" },
    { pIdx: 4, userId: liuwei.id, role: "暖通设计" },
    { pIdx: 5, userId: chensiyuan.id, role: "给排水专业负责人" },
    { pIdx: 5, userId: lijianguo.id, role: "建筑设计" },
  ];
  for (const m of memberData) {
    await prisma.projectMember.create({ data: { projectId: projects[m.pIdx].id, userId: m.userId, role: m.role } });
  }

  // 里程碑
  const msData = [
    { pIdx: 0, phase: "SCHEME" as const, name: "方案汇报", dueDate: new Date("2025-08-15"), isCompleted: true, completedAt: new Date("2025-08-10"), assigneeId: zhangmingyuan.id, sortOrder: 1 },
    { pIdx: 0, phase: "PRELIMINARY" as const, name: "初设评审", dueDate: new Date("2025-12-20"), isCompleted: true, completedAt: new Date("2025-12-18"), assigneeId: zhangmingyuan.id, sortOrder: 2 },
    { pIdx: 0, phase: "CONSTRUCTION" as const, name: "施工图一版交付", dueDate: new Date("2026-04-28"), isCompleted: false, completedAt: null, assigneeId: zhangmingyuan.id, sortOrder: 3 },
    { pIdx: 0, phase: "CONSTRUCTION" as const, name: "施工图审查通过", dueDate: new Date("2026-05-30"), isCompleted: false, completedAt: null, assigneeId: zhangmingyuan.id, sortOrder: 4 },
    { pIdx: 1, phase: "SCHEME" as const, name: "改造方案确认", dueDate: new Date("2025-11-30"), isCompleted: true, completedAt: new Date("2025-11-28"), assigneeId: lijianguo.id, sortOrder: 1 },
    { pIdx: 1, phase: "PRELIMINARY" as const, name: "初设文件提交", dueDate: new Date("2026-04-16"), isCompleted: false, completedAt: null, assigneeId: lijianguo.id, sortOrder: 2 },
    { pIdx: 2, phase: "SCHEME" as const, name: "概念方案汇报", dueDate: new Date("2026-04-11"), isCompleted: false, completedAt: null, assigneeId: wangxiaofeng.id, sortOrder: 1 },
    { pIdx: 2, phase: "SCHEME" as const, name: "方案深化", dueDate: new Date("2026-06-30"), isCompleted: false, completedAt: null, assigneeId: wangxiaofeng.id, sortOrder: 2 },
    { pIdx: 3, phase: "SCHEME" as const, name: "方案评审通过", dueDate: new Date("2025-06-01"), isCompleted: true, completedAt: new Date("2025-05-28"), assigneeId: admin.id, sortOrder: 1 },
    { pIdx: 3, phase: "PRELIMINARY" as const, name: "初设批复", dueDate: new Date("2025-10-15"), isCompleted: true, completedAt: new Date("2025-10-12"), assigneeId: admin.id, sortOrder: 2 },
    { pIdx: 3, phase: "CONSTRUCTION" as const, name: "施工图交付", dueDate: new Date("2026-05-10"), isCompleted: false, completedAt: null, assigneeId: admin.id, sortOrder: 3 },
    { pIdx: 4, phase: "COMPLETION" as const, name: "竣工验收", dueDate: new Date("2026-04-22"), isCompleted: false, completedAt: null, assigneeId: zhaopengfei.id, sortOrder: 1 },
    { pIdx: 5, phase: "SCHEME" as const, name: "方案确认", dueDate: new Date("2026-02-28"), isCompleted: true, completedAt: new Date("2026-03-05"), assigneeId: chensiyuan.id, sortOrder: 1 },
    { pIdx: 5, phase: "PRELIMINARY" as const, name: "初设中期检查", dueDate: new Date("2026-04-13"), isCompleted: false, completedAt: null, assigneeId: chensiyuan.id, sortOrder: 2 },
  ];
  for (const m of msData) {
    await prisma.milestone.create({ data: { projectId: projects[m.pIdx].id, phase: m.phase, name: m.name, dueDate: m.dueDate, isCompleted: m.isCompleted, completedAt: m.completedAt, assigneeId: m.assigneeId, sortOrder: m.sortOrder } });
  }

  // 备注
  const noteData = [
    { pIdx: 0, authorId: zhangmingyuan.id, content: "甲方要求门诊大厅增加自助挂号区域，面积约200平方米" },
    { pIdx: 0, authorId: zhaopengfei.id, content: "地基勘察报告已收到，地下室底板需加厚至600mm" },
    { pIdx: 1, authorId: lijianguo.id, content: "现场踏勘完成，原结构图纸与现状有出入，需补充测绘" },
    { pIdx: 2, authorId: wangxiaofeng.id, content: "甲方提出增加产后康复中心功能" },
    { pIdx: 3, authorId: admin.id, content: "实验室等级调整为P2+，需增加气密性和排风设计要求" },
  ];
  for (const n of noteData) {
    await prisma.projectNote.create({ data: { projectId: projects[n.pIdx].id, authorId: n.authorId, content: n.content } });
  }

  // 工作记录
  const today = new Date();
  const wlData = [
    { userId: zhangmingyuan.id, pIdx: 0, daysAgo: 0, hours: 6, content: "施工图建筑专业出图，完成三至五层平面图", category: "施工图出图" },
    { userId: zhangmingyuan.id, pIdx: 0, daysAgo: 1, hours: 8, content: "施工图建筑专业出图，完成一二层平面和立面", category: "施工图出图" },
    { userId: zhaopengfei.id, pIdx: 0, daysAgo: 0, hours: 4, content: "框架结构计算，地下室底板配筋", category: "计算书" },
    { userId: zhaopengfei.id, pIdx: 4, daysAgo: 0, hours: 3, content: "竣工资料整理，结构专业竣工图编制", category: "资料整理" },
    { userId: lijianguo.id, pIdx: 1, daysAgo: 0, hours: 7, content: "初设建筑专业图纸绘制，住院部改造平面", category: "初设图纸" },
    { userId: lijianguo.id, pIdx: 1, daysAgo: 1, hours: 3, content: "与甲方沟通改造范围确认", category: "甲方对接" },
    { userId: wangxiaofeng.id, pIdx: 2, daysAgo: 0, hours: 5, content: "方案草图深化，调整功能分区", category: "方案深化" },
    { userId: wangxiaofeng.id, pIdx: 2, daysAgo: 1, hours: 6, content: "参考案例研究，收集妇幼保健院设计资料", category: "方案设计" },
    { userId: chensiyuan.id, pIdx: 5, daysAgo: 0, hours: 6, content: "负压病房给排水系统方案设计", category: "方案设计" },
    { userId: chensiyuan.id, pIdx: 0, daysAgo: 1, hours: 4, content: "消防给水系统计算", category: "计算书" },
    { userId: liuwei.id, pIdx: 0, daysAgo: 0, hours: 5, content: "空调系统施工图，手术室净化系统", category: "施工图出图" },
    { userId: liuwei.id, pIdx: 4, daysAgo: 1, hours: 3, content: "暖通专业竣工图校核", category: "图纸校审" },
    { userId: admin.id, pIdx: 3, daysAgo: 0, hours: 4, content: "审核科研楼施工图，提出修改意见", category: "图纸校审" },
    { userId: admin.id, pIdx: 3, daysAgo: 1, hours: 2, content: "与延安大学基建处视频会议，确认实验室设备清单", category: "甲方对接" },
  ];
  for (const w of wlData) {
    const d = new Date(today);
    d.setDate(d.getDate() - w.daysAgo);
    d.setHours(9, 0, 0, 0);
    await prisma.workLog.create({ data: { userId: w.userId, projectId: projects[w.pIdx].id, date: d, hours: w.hours, content: w.content, category: w.category } });
  }

  return NextResponse.json({
    message: "Seed completed",
    users: 7,
    projects: 6,
    milestones: msData.length,
    notes: noteData.length,
    worklogs: wlData.length,
  });
}
