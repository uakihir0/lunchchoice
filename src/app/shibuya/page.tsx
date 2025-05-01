"use client";

import Header from "@/components/Header";
import shibuyaData from "@/data/shibuya.json";
import { Restaurant } from "@/models/Restaurant";
import { AVAILABLE_TAGS } from "@/models/Tags";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import "./ripple.css";

const Shibuya: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(
    null
  );
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [excludedTags, setExcludedTags] = useState<string[]>([]);
  const [hasAttemptedChoice, setHasAttemptedChoice] = useState(false);

  useEffect(() => {
    setRestaurants(shibuyaData.restaurants);

    // クエリパラメータからタグを取得
    const tags = searchParams.get("tags");
    if (tags) {
      const includedTags: string[] = [];
      const excludedTags: string[] = [];
      tags.split(",").forEach((tag) => {
        if (tag.startsWith("-")) {
          excludedTags.push(tag.substring(1));
        } else {
          includedTags.push(tag);
        }
      });
      setSelectedTags(includedTags);
      setExcludedTags(excludedTags);
    }
  }, [searchParams]);

  const handleRandomSelect = () => {
    setHasAttemptedChoice(true);
    // 選択されたタグに基づいてレストランをフィルタリング
    const filteredRestaurants = restaurants.filter((restaurant) => {
      // 含む条件のチェック
      const matchesIncludedTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => restaurant.tags.includes(tag));

      // 含まない条件のチェック
      const matchesExcludedTags =
        excludedTags.length === 0 ||
        excludedTags.every((tag) => !restaurant.tags.includes(tag));

      return matchesIncludedTags && matchesExcludedTags;
    });

    if (filteredRestaurants.length > 0) {
      // 重みの合計を計算
      const totalWeight = filteredRestaurants.reduce(
        (sum, restaurant) => sum + (restaurant.weight || 1),
        0
      );

      // 重みに基づいてランダムな値を生成
      let random = Math.random() * totalWeight;
      let selectedIndex = 0;

      // 重みに基づいてレストランを選択
      for (let i = 0; i < filteredRestaurants.length; i++) {
        random -= filteredRestaurants[i].weight || 1;
        if (random <= 0) {
          selectedIndex = i;
          break;
        }
      }

      setSelectedRestaurant(filteredRestaurants[selectedIndex].id);
    } else {
      setSelectedRestaurant(null);
    }
  };

  const toggleTag = (tag: string) => {
    let newSelectedTags = [...selectedTags];
    let newExcludedTags = [...excludedTags];

    if (selectedTags.includes(tag)) {
      // 含む条件から含まない条件に変更
      newSelectedTags = selectedTags.filter((t) => t !== tag);
      newExcludedTags = [...excludedTags, tag];
    } else if (excludedTags.includes(tag)) {
      // 含まない条件を解除
      newExcludedTags = excludedTags.filter((t) => t !== tag);
    } else {
      // 新しく含む条件として追加
      newSelectedTags = [...selectedTags, tag];
    }

    setSelectedTags(newSelectedTags);
    setExcludedTags(newExcludedTags);

    // URLを更新
    const params = new URLSearchParams(searchParams.toString());
    const allTags = [
      ...newSelectedTags,
      ...newExcludedTags.map((tag) => `-${tag}`),
    ];

    if (allTags.length > 0) {
      params.set("tags", allTags.join(","));
    } else {
      params.delete("tags");
    }
    router.push(`?${params.toString()}`);
  };

  const selectedRestaurantData = restaurants.find(
    (r) => r.id === selectedRestaurant
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20 px-4 sm:px-6 pb-24">
        <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-lg border border-gray-200">
          {selectedRestaurantData ? (
            <a
              href={selectedRestaurantData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 mb-6 hover:bg-gray-100 transition-all duration-300">
                <div className="text-left">
                  <div className="font-bold text-lg">
                    {selectedRestaurantData.name}
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {selectedRestaurantData.address}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedRestaurantData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ) : (
            <div className="text-center text-gray-500 py-8 mb-6 bg-gray-50 rounded-xl">
              <div className="p-2">
                {hasAttemptedChoice && selectedTags.length > 0
                  ? "指定の条件に合うレストランが見つかりませんでした"
                  : "条件を指定して Choice してください"}
              </div>
            </div>
          )}

          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-3">
              <div className="text-xs">
                タグをクリックで「含む」→「含まない」→「解除」
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.label)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                    selectedTags.includes(tag.label)
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : excludedTags.includes(tag.label)
                      ? "bg-red-100 text-red-700 border border-red-300"
                      : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-4 left-0 right-0 p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleRandomSelect}
            className="w-full px-6 py-3 rounded-full font-medium text-white bg-gradient-to-r from-gray-600 to-gray-800 whitespace-nowrap text-sm ripple"
          >
            🤞Choice
          </button>
        </div>
      </div>
    </>
  );
};

export default function Page() {
  return (
    <Suspense>
      <Shibuya />
    </Suspense>
  );
}
