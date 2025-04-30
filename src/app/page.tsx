"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const router = useRouter();

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    if (location === "渋谷") {
      router.push("/shibuya");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 px-4 sm:px-6">
        <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
          <h1 className="text-xl font-light tracking-wide text-gray-800 text-center mb-8">
            場所を選択してください
          </h1>

          <div className="space-y-4">
            <button
              onClick={() => handleLocationSelect("渋谷")}
              className={`w-full p-4 text-center rounded-xl border transition-all duration-300 font-bold ${
                selectedLocation === "渋谷"
                  ? "bg-blue-50 border-blue-200 text-blue-600"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              渋谷
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
