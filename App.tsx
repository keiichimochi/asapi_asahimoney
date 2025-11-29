import React, { useState } from 'react';
import Header from './components/Header';
import BudgetChart from './components/BudgetChart';
import TaxCard from './components/TaxCard';
import ChatModal from './components/ChatModal';
import AsapiCharacter from './components/AsapiCharacter';
import { BUDGET_DATA } from './constants';
import { TaxCategory } from './types';
import { explainTerm } from './services/geminiService';

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [selectedImageNum, setSelectedImageNum] = useState<number>(1);

  const handleCategorySelect = async (category: TaxCategory) => {
    setModalOpen(true);
    setIsLoading(true);
    setSelectedTerm(category.name);
    setExplanation(null);
    setSelectedImageNum(category.imageNum);

    // Call Gemini API
    const response = await explainTerm(category.name, category.kidsName);
    setExplanation(response);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] font-sans text-gray-800 pb-20">
      <Header />

      <main className="container mx-auto px-4 py-6 md:py-10 max-w-6xl">
        
        {/* Hero Section */}
        <div className="bg-white rounded-[3rem] p-6 md:p-10 shadow-xl border-4 border-yellow-400 mb-10 relative overflow-visible">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="order-2 md:order-1 flex-1 text-center md:text-left">
              <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-bold mb-4 text-sm md:text-base">
                令和6年度 旭市当初予算
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 leading-relaxed">
                旭市の税金、<br className="md:hidden" />
                <span className="text-orange-500 inline-block transform hover:scale-110 transition-transform cursor-default">何に使われているの？</span>
              </h2>
              <p className="text-gray-600 font-bold text-sm md:text-lg mb-6 leading-loose">
                みんなが住んでいる旭市を良くするために、<br/>
                税金はいろいろなところで役に立っているよ。<br/>
                気になる項目をタップして、<span className="text-orange-600">あさぴー</span>に聞いてみよう！
              </p>
            </div>
            
            <div className="order-1 md:order-2 shrink-0">
               {/* Hero Asapi - Explicitly set to Image #1 as requested */}
              <AsapiCharacter 
                imageNum={1} 
                isSpeaking={isLoading} 
                onClick={() => {}} 
                className="w-40 h-40 md:w-64 md:h-64"
              />
            </div>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute top-4 right-4 w-12 h-12 text-yellow-300 opacity-50">
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
          </div>
          <div className="absolute bottom-4 left-4 w-8 h-8 text-orange-200 opacity-50 transform rotate-45">
             <svg fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Chart */}
          <div className="lg:col-span-5 space-y-6">
             <div className="sticky top-24">
                <BudgetChart onCategorySelect={handleCategorySelect} />
                
                <div className="mt-6 bg-blue-50 border-l-8 border-blue-400 p-4 rounded-r-xl shadow-sm">
                  <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-2">
                    <span className="text-xl">💡</span> 知ってた？
                  </h4>
                  <p className="text-sm text-blue-900 font-medium leading-relaxed">
                    旭市の予算（一般会計）は、<br/>
                    <span className="text-lg font-bold text-blue-600 mx-1">約288億円</span>
                    だよ！<br/>
                    （令和6年度当初予算）
                  </p>
                </div>
             </div>
          </div>

          {/* Right: Card Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BUDGET_DATA.map((category) => (
                <TaxCard 
                  key={category.id} 
                  category={category} 
                  onClick={handleCategorySelect} 
                />
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-orange-400 text-white py-8 mt-12 text-center relative overflow-hidden">
         <div className="container mx-auto px-4 relative z-10">
            <p className="font-bold text-lg mb-2">あさぴーの税金教室</p>
            <p className="text-sm opacity-90">© Asahi City All Rights Reserved.</p>
            <div className="mt-4 text-xs opacity-70">
               Created with Gemini API
            </div>
         </div>
         {/* Footer decoration */}
         <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-300 rounded-full opacity-50"></div>
         <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400 rounded-full opacity-30"></div>
      </footer>

      {/* Modal */}
      <ChatModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        isLoading={isLoading}
        term={selectedTerm}
        content={explanation}
        imageNum={selectedImageNum}
      />
    </div>
  );
};

export default App;