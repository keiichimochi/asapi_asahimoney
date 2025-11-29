import React from 'react';
import { Sun } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-yellow-400 border-b-4 border-orange-400 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-white p-2 rounded-full border-2 border-orange-500">
             <Sun className="w-8 h-8 text-orange-500 animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white drop-shadow-md">
              あさぴーの税金教室
            </h1>
            <p className="text-xs text-yellow-50 font-bold">
              千葉県旭市のお金の使い方を学ぼう！
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;