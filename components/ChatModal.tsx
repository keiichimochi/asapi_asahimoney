import React, { useEffect, useRef } from 'react';
import { X, MessageCircle } from 'lucide-react';
import AsapiCharacter from './AsapiCharacter';
import Markdown from 'react-markdown';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  term: string | null;
  content: string | null;
  imageNum?: number;
}

const ChatModal: React.FC<Props> = ({ isOpen, onClose, isLoading, term, content, imageNum = 1 }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
        modalRef.current.scrollTop = 0;
    }
  }, [isOpen, content]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div 
        className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl border-4 border-yellow-400 flex flex-col max-h-[90vh] overflow-hidden relative transform transition-all"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-300 to-orange-300 p-4 flex items-center justify-between border-b-4 border-orange-200">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-full shadow-sm">
                 {/* Small icon version */}
                 <img 
                    src="./images/1.png" 
                    alt="icon" 
                    className="w-8 h-8 object-contain"
                 />
            </div>
            <h2 className="text-xl font-bold text-orange-900 drop-shadow-sm">あさぴーの解説</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white/50 hover:bg-white rounded-full text-orange-800 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div ref={modalRef} className="p-4 md:p-6 overflow-y-auto bg-[#FFFBF0] flex-1">
          <div className="flex flex-col gap-6">
            {/* User Question */}
            <div className="flex items-end gap-3 flex-row-reverse">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0 border-2 border-blue-300 shadow-sm">
                    <span className="text-2xl">🧒</span>
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-br-none shadow-sm border-2 border-blue-100 max-w-[80%]">
                    <p className="font-bold text-gray-700 text-lg">
                        「<span className="text-blue-600">{term?.split(' ')[0]}</span>」ってなに？
                    </p>
                </div>
            </div>

            {/* Asapi Answer */}
            <div className="flex items-start gap-4">
                 <div className="shrink-0 -mt-4">
                     {/* Use the specific image for this category */}
                     <AsapiCharacter imageNum={imageNum} className="w-24 h-24 md:w-28 md:h-28" />
                 </div>
                 <div className="bg-white p-5 rounded-2xl rounded-tl-none shadow-lg border-2 border-orange-300 max-w-[85%] relative mt-4">
                    {isLoading ? (
                        <div className="flex gap-2 items-center justify-center text-gray-500 h-12 w-full">
                            <span className="animate-bounce text-2xl">🍅</span>
                            <span className="animate-bounce delay-100 text-2xl">🐟</span>
                            <span className="animate-bounce delay-200 text-2xl">🌊</span>
                            <span className="text-sm font-bold ml-2 text-orange-500">あさぴー考え中...</span>
                        </div>
                    ) : (
                        <div className="prose prose-p:leading-relaxed prose-p:text-gray-800 prose-strong:text-orange-600 font-medium">
                           <Markdown>{content}</Markdown>
                        </div>
                    )}
                    
                    {/* Decorative elements */}
                    {!isLoading && (
                         <div className="absolute -top-3 -right-3 bg-yellow-400 text-white p-1 rounded-full shadow-sm">
                             <MessageCircle size={20} fill="white" />
                         </div>
                    )}
                 </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-orange-100 text-center shadow-inner">
          <button 
            onClick={onClose}
            className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold py-3 px-12 rounded-full shadow-orange-200 shadow-lg transform transition active:scale-95 flex items-center justify-center mx-auto gap-2"
          >
            <span>わかったよ！</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;