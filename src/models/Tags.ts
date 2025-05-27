export const AVAILABLE_TAGS = [
  // ジャンル
  { id: "washoku", label: "和食" },
  { id: "yoshoku", label: "洋食" },
  { id: "hamburger", label: "ハンバーガー" },
  { id: "yakiniku", label: "焼肉" },
  { id: "ramen", label: "ラーメン" },
  { id: "tsukemen", label: "つけ麺" },
  { id: "udon", label: "うどん" },
  { id: "soba", label: "そば" },
  { id: "curry", label: "カレー" },
  { id: "thai", label: "タイ料理" },
  { id: "korean", label: "韓国料理" },
  { id: "chanpon", label: "ちゃんぽん" },
  { id: "paella", label: "パエリア" },
  { id: "hawaiian", label: "ハワイアン" },

  // 値段帯
  { id: "price_under_1000", label: "~¥1000" },
  { id: "price_1000_1500", label: "¥1000~1500" },

  // 場所
  { id: "shibuya_sakura", label: "渋谷サクラステージ" },
  { id: "shibuya_stream", label: "渋谷ストリーム" },
  { id: "shibuya_hikarie", label: "渋谷ヒカリエ" },
  { id: "shibuya_akushu", label: "渋谷アクシュ" },
  { id: "miyashita_park", label: "MIYASHITA PARK" },
  { id: "shibuya_scramble", label: "渋谷スクランブルスクエア" },
  { id: "shibuya_metro", label: "渋谷メトロプラザ" },
  { id: "shibuya_cross", label: "渋谷クロスタワー" },
  { id: "shibuto_cine", label: "渋東シネタワー" },

  // その他
  { id: "mv", label: "MV" },
  { id: "toqpass", label: "TOQPass" },
  { id: "large_group", label: "大人数" },
] as const;

export type TagId = (typeof AVAILABLE_TAGS)[number]["id"];
export type TagLabel = (typeof AVAILABLE_TAGS)[number]["label"];
