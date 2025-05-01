この `doc/shibuya.md` に記載されている、おすすめレストランの markdown を JSON 形式に変換してください。変換した JSON は `src/data/shibuya.json` に上書き保存してください。変換する形式は以下のような JSON ファイルを想定しています。また、各フィールドの意味は、JSON をモデルマッピングした先の`src/models/Restaurant.ts` を参考にしてください。

```
{
  "restaurants": [
    {
      "id": "oceangoodtable",
      "name": "ocean good table 渋谷",
      "address": "渋谷ストリーム 1F",
      "latitude": 35.657657175718235,
      "longitude": 139.7030908529342,
      "url": "https://tabelog.com/tokyo/A1303/A130301/13286388/",
      "tags": ["MV", "洋食", "渋谷ストリーム", "TOQPass", "¥1000~1500"],
      "weight": 1
    },
    ... (中略) ...
  ]
}
```
