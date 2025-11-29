import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BUDGET_DATA } from '../constants';
import { TaxCategory } from '../types';

interface Props {
  onCategorySelect: (category: TaxCategory) => void;
}

const BudgetChart: React.FC<Props> = ({ onCategorySelect }) => {
  // Filter data for chart
  const data = BUDGET_DATA;

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs md:text-sm font-bold drop-shadow-md"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full h-[300px] md:h-[400px] bg-white rounded-3xl shadow-lg p-4 border-4 border-blue-100">
      <h3 className="text-center text-lg font-bold text-blue-600 mb-2">
        旭市の予算グラフ
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="amount"
            onClick={(data) => {
                const category = BUDGET_DATA.find(c => c.name === data.name);
                if (category) onCategorySelect(category);
            }}
            className="cursor-pointer outline-none"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                className="hover:opacity-80 transition-opacity stroke-white stroke-2"
              />
            ))}
          </Pie>
          <Tooltip 
             formatter={(value: number, name: string) => [`${value}%`, name.split(' ')[0]]}
             contentStyle={{ borderRadius: '12px', border: '2px solid #fbbf24' }}
          />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
            iconType="circle"
            formatter={(value, entry: any) => <span className="text-xs font-bold text-gray-600 ml-1">{value.split(' ')[0]}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetChart;