import React from 'react';
import { Check, Minus, Shield, CheckCircle2, Cloud, Smartphone, Monitor, Lock } from 'lucide-react';

interface FeatureRow {
  name: string;
  basic: boolean | string;
  std: boolean | string;
  prem: boolean | string;
  e3: boolean | string;
  e5: boolean | string;
}

interface FeatureCategory {
  title: string;
  icon: React.ReactNode;
  rows: FeatureRow[];
}

export const FeatureMatrix: React.FC = () => {
  const data: FeatureCategory[] = [
    {
      title: "Productivity Apps",
      icon: <Monitor className="w-5 h-5 text-blue-600" />,
      rows: [
        { name: "Web & Mobile Apps", basic: true, std: true, prem: true, e3: true, e5: true },
        { name: "Desktop Apps (Word, Excel, PPT)", basic: false, std: true, prem: true, e3: "Enterprise", e5: "Enterprise" },
        { name: "Publisher & Access (PC Only)", basic: false, std: true, prem: true, e3: true, e5: true },
        { name: "Shared Computer Activation", basic: false, std: false, prem: true, e3: true, e5: true },
        { name: "Multilingual User Interface", basic: false, std: true, prem: true, e3: true, e5: true },
      ]
    },
    {
      title: "Email & Storage",
      icon: <Cloud className="w-5 h-5 text-indigo-600" />,
      rows: [
        { name: "Exchange Mailbox Size", basic: "50 GB", std: "50 GB", prem: "50 GB", e3: "100 GB", e5: "100 GB" },
        { name: "Exchange Online Archiving", basic: false, std: false, prem: "1.5 TB", e3: "Unlimited", e5: "Unlimited" },
        { name: "OneDrive Storage", basic: "1 TB", std: "1 TB", prem: "1 TB", e3: "1-5 TB+", e5: "1-5 TB+" },
        { name: "SharePoint Online", basic: true, std: true, prem: true, e3: true, e5: true },
      ]
    },
    {
      title: "Device Management",
      icon: <Smartphone className="w-5 h-5 text-purple-600" />,
      rows: [
        { name: "Intune (MDM/MAM)", basic: false, std: false, prem: true, e3: true, e5: true },
        { name: "Windows AutoPilot", basic: false, std: false, prem: true, e3: true, e5: true },
        { name: "Group Policy Support", basic: false, std: false, prem: true, e3: true, e5: true },
        { name: "Windows OS Rights", basic: false, std: false, prem: "Win 10/11 Biz", e3: "Win 11 Ent E3", e5: "Win 11 Ent E5" },
      ]
    },
    {
      title: "Identity & Security",
      icon: <Shield className="w-5 h-5 text-green-600" />,
      rows: [
        { name: "Entra ID (Azure AD)", basic: "Free", std: "Free", prem: "Plan 1", e3: "Plan 1", e5: "Plan 2" },
        { name: "Conditional Access", basic: false, std: false, prem: true, e3: true, e5: true },
        { name: "MFA (Modern Auth)", basic: true, std: true, prem: true, e3: true, e5: true },
        { name: "Self-Service Password Reset", basic: "Cloud Only", std: "Cloud Only", prem: "Hybrid", e3: "Hybrid", e5: "Hybrid" },
      ]
    },
    {
      title: "Threat Protection",
      icon: <Lock className="w-5 h-5 text-red-600" />,
      rows: [
        { name: "Defender Antivirus", basic: true, std: true, prem: true, e3: true, e5: true },
        { name: "Defender for Business/Endpoint", basic: false, std: false, prem: "Business", e3: "Endpoint P1", e5: "Endpoint P2" },
        { name: "Defender for Office 365", basic: "EOP Only", std: "EOP Only", prem: "Business", e3: "EOP Only", e5: "Plan 2" },
        { name: "Defender for Identity", basic: false, std: false, prem: false, e3: false, e5: true },
      ]
    }
  ];

  const renderCell = (value: boolean | string) => {
    if (value === true) return <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />;
    if (value === false) return <Minus className="w-5 h-5 text-slate-200 mx-auto" />;
    return <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded">{value}</span>;
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-8 border-b border-slate-200 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Detailed Feature Matrix</h2>
        <p className="text-slate-500">A comprehensive breakdown of entitlements across the most popular SKU families.</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-white border-b-2 border-slate-100">
              <th className="p-4 w-1/3 min-w-[200px] sticky left-0 bg-white z-10 shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)]">Feature</th>
              <th className="p-4 text-center min-w-[120px] bg-slate-50/50">
                <div className="font-bold text-slate-800">Business Basic</div>
                <div className="text-xs text-slate-400 font-normal">$6.00</div>
              </th>
              <th className="p-4 text-center min-w-[120px]">
                <div className="font-bold text-slate-800">Business Std</div>
                <div className="text-xs text-slate-400 font-normal">$12.50</div>
              </th>
              <th className="p-4 text-center min-w-[120px] bg-blue-50/50 border-x border-blue-100">
                <div className="font-bold text-blue-700">Business Prem</div>
                <div className="text-xs text-blue-400 font-normal">$22.00</div>
              </th>
              <th className="p-4 text-center min-w-[120px]">
                <div className="font-bold text-slate-800">Enterprise E3</div>
                <div className="text-xs text-slate-400 font-normal">$36.00</div>
              </th>
              <th className="p-4 text-center min-w-[120px] bg-indigo-50/50">
                <div className="font-bold text-indigo-700">Enterprise E5</div>
                <div className="text-xs text-indigo-400 font-normal">$57.00</div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((category) => (
              <React.Fragment key={category.title}>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <td colSpan={6} className="px-4 py-2">
                    <div className="flex items-center gap-2 font-bold text-slate-600 uppercase text-xs tracking-wider">
                      {category.icon}
                      {category.title}
                    </div>
                  </td>
                </tr>
                {category.rows.map((row) => (
                  <tr key={row.name} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="p-4 font-medium text-slate-700 sticky left-0 bg-white group-hover:bg-slate-50/80 shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)] border-r border-transparent group-hover:border-slate-100">
                        {row.name}
                    </td>
                    <td className="p-4 text-center bg-slate-50/30">{renderCell(row.basic)}</td>
                    <td className="p-4 text-center">{renderCell(row.std)}</td>
                    <td className="p-4 text-center bg-blue-50/30 border-x border-blue-50 group-hover:bg-blue-50/50">{renderCell(row.prem)}</td>
                    <td className="p-4 text-center">{renderCell(row.e3)}</td>
                    <td className="p-4 text-center bg-indigo-50/30 group-hover:bg-indigo-50/50">{renderCell(row.e5)}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50 p-4 text-xs text-center text-slate-400 border-t border-slate-200">
        Note: Table summarizes key features. "Enterprise" refers to M365 Apps for Enterprise. Pricing is estimated commercial ERP.
      </div>
    </div>
  );
};
