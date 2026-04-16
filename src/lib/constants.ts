export const PHASE_LABELS: Record<string, string> = {
  SCHEME: "方案设计",
  PRELIMINARY: "初步设计",
  CONSTRUCTION: "施工图设计",
  COMPLETION: "竣工验收",
};

export const STATUS_LABELS: Record<string, string> = {
  ACTIVE: "进行中",
  PAUSED: "已暂停",
  COMPLETED: "已完成",
  ARCHIVED: "已归档",
};

export const PROJECT_TYPES = [
  "医疗",
  "教育",
  "办公",
  "住宅",
  "文化",
  "商业",
  "工业",
  "市政",
];

export const PHASE_OPTIONS = [
  { value: "SCHEME", label: "方案设计" },
  { value: "PRELIMINARY", label: "初步设计" },
  { value: "CONSTRUCTION", label: "施工图设计" },
  { value: "COMPLETION", label: "竣工验收" },
];

export const STATUS_OPTIONS = [
  { value: "ACTIVE", label: "进行中" },
  { value: "PAUSED", label: "已暂停" },
  { value: "COMPLETED", label: "已完成" },
  { value: "ARCHIVED", label: "已归档" },
];

// 工作类别 - 建筑设计院细化分类
export const WORK_CATEGORIES = [
  // 主线设计
  { value: "方案设计", group: "设计" },
  { value: "方案文本", group: "设计" },
  { value: "方案汇报", group: "设计" },
  { value: "方案深化", group: "设计" },
  { value: "初设图纸", group: "设计" },
  { value: "施工图出图", group: "设计" },
  { value: "模型制作", group: "设计" },
  { value: "效果图", group: "设计" },
  { value: "计算书", group: "设计" },
  // 配合工作
  { value: "配合变更", group: "配合" },
  { value: "配合报审", group: "配合" },
  { value: "配合投标", group: "配合" },
  { value: "图纸校审", group: "配合" },
  { value: "资料整理", group: "配合" },
  // 协调沟通
  { value: "甲方对接", group: "协调" },
  { value: "政府对接", group: "协调" },
  { value: "内部协调", group: "协调" },
  { value: "专业配合", group: "协调" },
  { value: "会议", group: "协调" },
  // 外出
  { value: "现场踏勘", group: "外出" },
  { value: "出差考察", group: "外出" },
  { value: "驻场服务", group: "外出" },
  // 评审
  { value: "方案评审", group: "评审" },
  { value: "初设评审", group: "评审" },
  { value: "施工图审查", group: "评审" },
  { value: "竣工验收", group: "评审" },
  // 其他
  { value: "学习培训", group: "其他" },
  { value: "其他", group: "其他" },
];

export const WORK_CATEGORY_GROUPS = ["设计", "配合", "协调", "外出", "评审", "其他"];
