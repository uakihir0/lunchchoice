export const AVAILABLE_TAGS = [
  // ジャンル
  { id: "ramen", label: "ラーメン" },
  { id: "washoku", label: "和食" },
  { id: "yoshoku", label: "洋食" },
  { id: "chanpon", label: "ちゃんぽん" },
  { id: "tsukemen", label: "つけ麺" },

  // 値段帯
  { id: "price_1000_1500", label: "¥1000~1500" },
  { id: "price_under_1000", label: "~¥1000" },

  // 場所
  { id: "shibuya_stream", label: "渋谷ストリーム" },
  { id: "shibuya_sakura", label: "渋谷サクラステージ" },

  // その他
  { id: "mv", label: "MV" },
  { id: "toqpass", label: "TOQPass" },
] as const;

export type TagId = (typeof AVAILABLE_TAGS)[number]["id"];
export type TagLabel = (typeof AVAILABLE_TAGS)[number]["label"];
