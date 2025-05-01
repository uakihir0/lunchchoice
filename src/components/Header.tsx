import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-lg mx-auto px-4 sm:px-6">
        <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200">
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-lg font-light tracking-wide text-gray-700">
                🤞 LunchChoice
              </h1>
            </div>
            <nav className="flex space-x-6">
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300 font-light"
              >
                TOP
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
