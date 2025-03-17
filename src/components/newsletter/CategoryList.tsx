
import React, { useState } from 'react';
import { Check } from 'lucide-react';

const categories = [
  'Deep Learning for Financial Markets',
  'Reinforcement Learning in Portfolio Optimization',
  'NLP Analysis of Financial Communications',
  'Consultative Sales in AI Solutions',
  'IoT and 5G in Industry Applications'
];

const CategoryList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <div className="p-8 md:col-span-2 bg-white/5">
      <h3 className="text-xl font-semibold mb-4">Featured Topics</h3>
      <ul className="space-y-3">
        {categories.map((category, index) => (
          <li 
            key={index} 
            className={`flex items-start gap-2 cursor-pointer transition-all duration-300`}
            onClick={() => handleCategoryClick(category)}
          >
            <div className={`h-5 w-5 rounded-full ${selectedCategory === category ? 'bg-turquoise' : 'bg-turquoise/20'} flex items-center justify-center shrink-0 mt-0.5`}>
              <Check className={`h-3 w-3 ${selectedCategory === category ? 'text-navy' : 'text-turquoise'}`} />
            </div>
            <span 
              className={`text-white/80 text-sm border-b ${
                selectedCategory === category 
                ? 'border-vivid-purple pb-0.5 text-white' 
                : 'border-transparent'
              }`}
            >
              {category}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
