import React from 'react';
import { TaxCategory } from '../types';
import { Heart, Stethoscope, Truck, School, Sprout, Flame, Building, HelpCircle } from 'lucide-react';

interface Props {
  category: TaxCategory;
  onClick: (category: TaxCategory) => void;
}

const iconMap: Record<string, React.ElementType> = {
  'hand-heart': Heart,
  'stethoscope': Stethoscope,
  'construction': Truck,
  'school': School,
  'sprout': Sprout,
  'flame': Flame,
  'building': Building,
};

const TaxCard: React.FC<Props> = ({ category, onClick }) => {
  const IconComponent = iconMap[category.icon] || HelpCircle;

  return (
    <button 
      onClick={() => onClick(category)}
      className="group w-full bg-white rounded-2xl shadow-md border-b-4 hover:border-b-0 hover:translate-y-1 transition-all duration-200 overflow-hidden text-left"
      style={{ borderColor: category.color }}
    >
      <div className="p-4 flex items-start gap-4">
        <div 
          className="p-3 rounded-full text-white shadow-inner shrink-0"
          style={{ backgroundColor: category.color }}
        >
          <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
             <h4 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-blue-600 transition-colors">
               {category.name.split(' ')[0]}
             </h4>
             <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
               {category.amount}%
             </span>
          </div>
          <p className="text-sm font-bold text-gray-500 mb-2">
            {category.kidsName}
          </p>
          <p className="text-xs text-gray-600 line-clamp-2">
            {category.shortDesc}
          </p>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-2 text-center text-xs text-blue-400 font-bold group-hover:bg-blue-50 group-hover:text-blue-600">
        <span className="underline decoration-dotted">あさぴーに聞く</span>
      </div>
    </button>
  );
};

export default TaxCard;