import React, { useState } from 'react';
import { CALCULATOR_ITEMS, CalculatorItem } from '../constants';
import { Check, X, Calculator, Plus, Minus, ShoppingCart, TrendingDown, ArrowRight, Wallet } from 'lucide-react';

export const LicenseCalculator: React.FC = () => {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [compareTargetId, setCompareTargetId] = useState<string>('m365-e3'); // Default comparison: M365 E3

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleInputChange = (id: string, value: string) => {
    const num = parseInt(value) || 0;
    if (num < 0) return;
    
    setQuantities(prev => {
      if (num === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: num };
    });
  };

  const categories = Array.from(new Set(CALCULATOR_ITEMS.map(i => i.category)));

  // Calculate costs
  const totalCost = Object.entries(quantities).reduce((acc: number, [id, qty]) => {
    const item = CALCULATOR_ITEMS.find(i => i.id === id);
    return acc + (item ? item.price * (qty as number) : 0);
  }, 0);

  // Fix: Cast Object.values to number[] to resolve 'unknown' type error
  const totalUsers: number = (Object.values(quantities) as number[]).reduce((a, b) => a + b, 0);

  // Savings Logic
  const compareTarget = CALCULATOR_ITEMS.find(i => i.id === compareTargetId);
  const baselineCost = compareTarget ? compareTarget.price * totalUsers : 0;
  const savings = baselineCost - totalCost;
  const isSaving = savings > 0;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row">
      
      {/* Main Calculator Area */}
      <div className="flex-1 p-6 md:p-8">
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
               <div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
                   <Calculator className="w-6 h-6" />
               </div>
               Dynamic License Calculator
            </h2>
            <p className="text-slate-500 mt-2">Mix and match licenses to fit your exact workforce needs. Stop paying for features you don't use.</p>
        </div>

        <div className="space-y-12">
          {categories.map(category => (
            <div key={category} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                {category}
                <div className="h-px bg-slate-100 flex-1"></div>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {CALCULATOR_ITEMS.filter(i => i.category === category).map((item: CalculatorItem) => (
                  <div key={item.id} className={`
                    group relative rounded-2xl border-2 transition-all duration-300 p-5 flex flex-col h-full hover:-translate-y-1
                    ${quantities[item.id] 
                        ? 'border-blue-600 bg-blue-50/20 shadow-xl shadow-blue-200' 
                        : 'border-blue-100 bg-white hover:border-blue-400 hover:shadow-xl hover:shadow-blue-100'}
                  `}>
                    <div className="mb-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-800 text-base leading-tight pr-2">{item.name}</h4>
                        <div className={`text-xs font-bold px-2 py-1 rounded-lg shrink-0 ${quantities[item.id] ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                           ${item.price.toFixed(2)}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mb-3 min-h-[1.25rem]">{item.skuName}</p>
                      
                      <div className="space-y-1.5 mb-4">
                        {item.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600">
                            <Check className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-dashed border-slate-200 flex items-center justify-between">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                        Users
                      </div>
                      <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-1 shadow-sm">
                            <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm text-slate-500 transition-all"
                            >
                                <Minus className="w-3 h-3" />
                            </button>
                            <input 
                                type="number" 
                                min="0"
                                value={quantities[item.id] || ''}
                                placeholder="0"
                                onChange={(e) => handleInputChange(item.id, e.target.value)}
                                className="w-10 text-center text-sm font-bold text-slate-800 outline-none bg-transparent"
                            />
                             <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm text-blue-600 transition-all bg-white shadow-sm border border-slate-100"
                            >
                                <Plus className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar: Cost Summary & Savings Projection */}
      <div className="w-full lg:w-96 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 p-6 md:p-8 flex flex-col sticky top-0 h-fit max-h-screen overflow-y-auto">
         
         {/* Total Summary */}
         <div className="mb-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-slate-500" />
                Monthly Estimate
            </h3>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-4">
                <div className="text-slate-500 text-sm font-medium mb-1">Total Users</div>
                <div className="text-2xl font-bold text-slate-800 mb-4">{totalUsers} <span className="text-base font-normal text-slate-400">seats</span></div>
                
                <div className="text-slate-500 text-sm font-medium mb-1">Estimated Cost</div>
                <div className="text-4xl font-black text-blue-600 tracking-tight flex items-baseline gap-1">
                    ${totalCost.toFixed(2)} 
                    <span className="text-base font-normal text-slate-400">/mo</span>
                </div>
            </div>

            {/* Itemized List */}
            {totalUsers > 0 && (
                <div className="space-y-2 mb-6 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                    {Object.entries(quantities).map(([id, q]) => {
                         const qty = q as number;
                         const item = CALCULATOR_ITEMS.find(i => i.id === id);
                         if (!item) return null;
                         return (
                            <div key={id} className="flex justify-between text-xs items-center p-2 bg-white rounded-lg border border-slate-100">
                                <span className="font-medium text-slate-700 truncate max-w-[120px]" title={item.name}>{item.name}</span>
                                <div className="flex gap-2">
                                    <span className="text-slate-500">x{qty}</span>
                                    <span className="font-bold text-slate-800">${(item.price * qty).toFixed(2)}</span>
                                </div>
                            </div>
                         )
                    })}
                </div>
            )}
         </div>

         {/* Savings Projection */}
         <div className="mt-auto bg-indigo-900 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
                <Wallet className="w-24 h-24 rotate-12" />
            </div>

            <h3 className="text-lg font-bold mb-2 relative z-10 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-green-400" />
                Savings Projector
            </h3>
            <p className="text-indigo-200 text-xs mb-4 relative z-10">
                Compare your optimized mix against a uniform deployment of a more expensive license.
            </p>

            <label className="text-xs font-bold text-indigo-300 uppercase block mb-2 relative z-10">Compare Against</label>
            <div className="relative z-10 mb-6">
                <select 
                    value={compareTargetId}
                    onChange={(e) => setCompareTargetId(e.target.value)}
                    className="w-full bg-indigo-800 border border-indigo-700 text-white text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-green-400 outline-none"
                >
                    <option value="m365-e5">Microsoft 365 E5 ($57.00)</option>
                    <option value="m365-e3">Microsoft 365 E3 ($36.00)</option>
                    <option value="o365-e3">Office 365 E3 ($23.00)</option>
                    <option value="m365-bus-prem">Business Premium ($22.00)</option>
                </select>
            </div>

            {totalUsers > 0 ? (
                 <div className="relative z-10">
                    <div className="flex justify-between items-center text-sm text-indigo-200 mb-1">
                        <span>Uniform Cost ({compareTarget?.name || 'Baseline'})</span>
                    </div>
                    <div className="text-lg font-semibold text-white mb-3 border-b border-indigo-800 pb-3">
                        ${baselineCost.toFixed(2)} /mo
                    </div>

                    <div className="flex justify-between items-center text-sm text-indigo-200 mb-1">
                        <span>Potential Savings</span>
                    </div>
                    {isSaving ? (
                        <div className="text-3xl font-bold text-green-400 flex items-center gap-2">
                            ${savings.toFixed(2)}
                            <TrendingDown className="w-6 h-6" />
                        </div>
                    ) : (
                        <div className="text-xl font-bold text-red-300 flex items-center gap-2">
                            -${Math.abs(savings).toFixed(2)}
                            <span className="text-xs font-normal text-indigo-300">(Cost increase)</span>
                        </div>
                    )}
                    <div className="text-xs text-indigo-400 mt-1">per month</div>
                </div>
            ) : (
                <div className="text-center py-4 text-indigo-300 text-sm border-2 border-dashed border-indigo-800 rounded-lg relative z-10">
                    Add users to see savings
                </div>
            )}
         </div>

      </div>
    </div>
  );
};