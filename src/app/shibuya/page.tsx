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
    null,
  );
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [hasAttemptedChoice, setHasAttemptedChoice] = useState(false);

  useEffect(() => {
    setRestaurants(shibuyaData.restaurants);

    // クエリパラメータからタグを取得
    const tags = searchParams.get("tags");
    if (tags) {
      setSelectedTags(tags.split(","));
    }
  }, [searchParams]);

  const handleRandomSelect = () => {
    setHasAttemptedChoice(true);
    // 選択されたタグに基づいてレストランをフィルタリング
    const filteredRestaurants = restaurants.filter((restaurant) =>
      selectedTags.length === 0
        ? true
        : selectedTags.every((tag) => restaurant.tags.includes(tag)),
    );

    if (filteredRestaurants.length > 0) {
      // 重みの合計を計算
      const totalWeight = filteredRestaurants.reduce(
        (sum, restaurant) => sum + (restaurant.weight || 1),
        0,
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
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);

    // URLを更新
    const params = new URLSearchParams(searchParams.toString());
    if (newTags.length > 0) {
      params.set("tags", newTags.join(","));
    } else {
      params.delete("tags");
    }
    router.push(`?${params.toString()}`);
  };

  const selectedRestaurantData = restaurants.find(
    (r) => r.id === selectedRestaurant,
  );

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 px-4 sm:px-6">
        <div className="max-w-md w-full p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
          {selectedRestaurantData ? (
            <a
              href={selectedRestaurantData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50 text-blue-600 mb-6 hover:bg-blue-100 transition-all duration-300">
                <div className="text-left">
                  <div className="font-bold text-lg">
                    {selectedRestaurantData.name}
                  </div>
                  <div className="text-sm text-blue-500 mt-2">
                    {selectedRestaurantData.address}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedRestaurantData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs"
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

          <button
            onClick={handleRandomSelect}
            className="ripple w-full p-4 text-center rounded-xl border-2 border-blue-400 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-bold mb-6 shadow-md"
          >
            🤞Choice
          </button>

          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">タグを選択</div>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.label)}
                  className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                    selectedTags.includes(tag.label)
                      ? "bg-blue-100 text-blue-600 border border-blue-200"
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
