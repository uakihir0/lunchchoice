export const AVAILABLE_TAGS = [
  { id: "ramen", label: "ラーメン" },
  { id: "yakiniku", label: "焼肉" },
  { id: "italian", label: "イタリアン" },
  { id: "french", label: "フレンチ" },
  { id: "tsukemen", label: "つけ麺" },
  { id: "solo", label: "一人" },
  { id: "date", label: "デート" },
  { id: "group", label: "グループ" },
  { id: "counter", label: "カウンター" },
  { id: "luxury", label: "高級" },
  { id: "stylish", label: "おしゃれ" },
  { id: "24hours", label: "24時間" },
] as const;

export type TagId = (typeof AVAILABLE_TAGS)[number]["id"];
export type TagLabel = (typeof AVAILABLE_TAGS)[number]["label"];
