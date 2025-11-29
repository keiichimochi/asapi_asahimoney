import React, { useState, useEffect } from 'react';

interface AsapiProps {
  isSpeaking?: boolean;
  onClick?: () => void;
  className?: string;
  imageNum?: number; // Official design collection number
}

const AsapiCharacter: React.FC<AsapiProps> = ({ isSpeaking, onClick, className = "", imageNum = 1 }) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [useSvgFallback, setUseSvgFallback] = useState(false);

  // Path setting
  useEffect(() => {
    setUseSvgFallback(false);
    // Try to load from relative path
    setImageSrc(`./images/${imageNum}.png`);
  }, [imageNum]);

  const handleImageError = () => {
    // If image fails to load (e.g. file doesn't exist), switch to SVG fallback
    setUseSvgFallback(true);
  };

  return (
    <div 
      onClick={onClick}
      className={`relative cursor-pointer group transition-transform hover:scale-105 ${className}`}
    >
      {/* Character Container */}
      <div className="w-full h-full relative mx-auto aspect-square">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-yellow-200 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
        
        {/* Main Image/SVG Circle */}
        <div className="relative w-full h-full bg-white/80 rounded-full border-4 border-orange-400 shadow-xl overflow-hidden flex items-center justify-center p-2">
            {!useSvgFallback ? (
              <img 
                  key={imageSrc}
                  src={imageSrc}
                  alt={`あさぴー #${imageNum}`}
                  className="w-full h-full object-contain transform transition-transform duration-500 group-hover:rotate-6"
                  onError={handleImageError}
              />
            ) : (
              /* SVG Fallback Asapi */
              <svg viewBox="0 0 200 200" className="w-full h-full transform transition-transform duration-500 group-hover:rotate-6">
                {/* Body (Yellow) */}
                <circle cx="100" cy="110" r="70" fill="#FFEB3B" />
                
                {/* Tomato Hat (Red) */}
                <path d="M30,110 Q30,40 100,40 Q170,40 170,110" fill="#FF5252" />
                {/* Hat Leaves (Green) */}
                <path d="M100,40 L90,20 L110,30 L120,10 L100,40" fill="#4CAF50" />
                <path d="M80,50 L70,30 L90,40" fill="#4CAF50" />
                <path d="M120,50 L130,30 L110,40" fill="#4CAF50" />

                {/* Face */}
                {/* Eyes */}
                <circle cx="70" cy="110" r="8" fill="#3E2723" />
                <circle cx="130" cy="110" r="8" fill="#3E2723" />
                <circle cx="72" cy="108" r="3" fill="white" />
                <circle cx="132" cy="108" r="3" fill="white" />
                
                {/* Cheeks */}
                <circle cx="50" cy="120" r="10" fill="#FFCDD2" opacity="0.6" />
                <circle cx="150" cy="120" r="10" fill="#FFCDD2" opacity="0.6" />

                {/* Beak */}
                <path d="M90,125 Q100,140 110,125" fill="#FF9800" stroke="#E65100" strokeWidth="2" />

                {/* Hands/Wings */}
                <path d="M35,120 Q20,140 40,150" fill="#FFEB3B" stroke="#FBC02D" strokeWidth="2" />
                <path d="M165,120 Q180,140 160,150" fill="#FFEB3B" stroke="#FBC02D" strokeWidth="2" />

                {/* Text overlay for specific poses */}
                <text x="100" y="180" textAnchor="middle" fontSize="20" fill="#E65100" fontWeight="bold" fontFamily="sans-serif">
                   #{imageNum}
                </text>
              </svg>
            )}
        </div>
        
        {/* Speech/Thinking Indicator */}
        {isSpeaking && (
          <div className="absolute -top-2 -right-4 animate-bounce z-10">
             <div className="bg-white border-2 border-blue-400 px-3 py-1 rounded-full rounded-bl-none shadow-md text-xs font-bold text-blue-600 whitespace-nowrap">
                考え中だっぴ...
             </div>
          </div>
        )}
      </div>
      
      {/* Label */}
      <div className="text-center mt-3">
        <span className="inline-block bg-orange-500 text-white text-sm font-bold px-4 py-1 rounded-full border-2 border-white shadow-md group-hover:bg-orange-600 transition-colors">
          あさぴー
        </span>
      </div>
    </div>
  );
};

export default AsapiCharacter;