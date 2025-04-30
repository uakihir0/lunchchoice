import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-4 bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-700/50">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-light tracking-wide text-white">
                🤞 LunchChoice
              </h1>
            </div>
            <nav className="flex space-x-6">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors duration-300 font-light"
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
