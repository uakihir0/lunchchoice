export interface Restaurant {
  // レストランの ID (一意であれば何でも OK)
  id: string;
  // レストランの名前
  name: string;
  // レストランの住所
  address: string;
  // レストランのタグ
  tags: string[];
  // レストランの緯度
  latitude: number;
  // レストランの経度
  longitude: number;
  // レストランの URL
  url: string;
  // ランダムで選ばれる時の重み付け (重みが高いほど選ばれやすい)
  // 重みは 0 以上の整数で表現、デフォルトは 1 に設定
  weight: number;
}
