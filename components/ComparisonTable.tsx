import React from 'react';
import { LicensePlan } from '../types';
import { Check, X, Minus, ShieldCheck, AppWindow, Cloud, Settings } from 'lucide-react';

interface ComparisonTableProps {
  planA: LicensePlan;
  planB: LicensePlan;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ planA, planB }) => {

  const getAllUniqueFeatures = (key: keyof LicensePlan) => {
    const featuresA = (planA[key] as string[]) || [];
    const featuresB = (planB[key] as string[]) || [];
    return Array.from(new Set([...featuresA, ...featuresB])).sort();
  };

  const hasFeature = (plan: LicensePlan, feature: string, key: keyof LicensePlan) => {
    return (plan[key] as string[])?.includes(feature);
  };

  const renderIcon = (present: boolean, category: string) => {
    if (!present) return <Minus className="w-5 h-5 text-slate-200 mx-auto" />;
    
    switch (category) {
      case 'security': return <ShieldCheck className="w-5 h-5 text-blue-600 mx-auto" />;
      case 'apps': return <Check className="w-5 h-5 text-green-600 mx-auto" />;
      default: return <Check className="w-5 h-5 text-indigo-600 mx-auto" />;
    }
  };

  const sections = [
    { 
      id: 'apps', 
      label: 'Office Applications', 
      icon: <AppWindow className="w-4 h-4" />,
      items: getAllUniqueFeatures('apps') 
    },
    { 
      id: 'services', 
      label: 'Cloud Services', 
      icon: <Cloud className="w-4 h-4" />,
      items: getAllUniqueFeatures('services') 
    },
    { 
      id: 'security', 
      label: 'Security & Management', 
      icon: <ShieldCheck className="w-4 h-4" />,
      items: getAllUniqueFeatures('security') 
    },
    { 
      id: 'features', 
      label: 'Licensing Rules', 
      icon: <Settings className="w-4 h-4" />,
      items: getAllUniqueFeatures('features') 
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 p-4">
        <div className="col-span-1 font-semibold text-slate-500 text-sm uppercase tracking-wider self-center">Comparison</div>
        <div className="col-span-1 text-center">
            <div className="font-bold text-slate-800 text-sm md:text-base leading-tight">{planA.shortName}</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">{planA.price}</div>
        </div>
        <div className="col-span-1 text-center">
            <div className="font-bold text-slate-800 text-sm md:text-base leading-tight">{planB.shortName}</div>
            <div className="text-xs text-slate-500 mt-1 font-medium">{planB.price}</div>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {sections.map((section) => (
            section.items.length > 0 && (
            <React.Fragment key={section.id}>
                <div className="bg-slate-50/80 px-4 py-2 font-semibold text-xs text-slate-600 uppercase tracking-widest flex items-center gap-2">
                    {section.icon}
                    {section.label}
                </div>
                {section.items.map((item) => (
                    <div key={item} className="grid grid-cols-3 p-4 hover:bg-slate-50 transition-colors items-center">
                        <div className="col-span-1 text-sm font-medium text-slate-700 pr-2">{item}</div>
                        <div className="col-span-1 text-center">
                            {renderIcon(hasFeature(planA, item, section.id as keyof LicensePlan), section.id)}
                        </div>
                        <div className="col-span-1 text-center">
                            {renderIcon(hasFeature(planB, item, section.id as keyof LicensePlan), section.id)}
                        </div>
                    </div>
                ))}
            </React.Fragment>
            )
        ))}
      </div>
    </div>
  );
};
