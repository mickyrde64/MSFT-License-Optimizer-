import React, { useState } from 'react';
import { PLANS } from './constants';
import { AiResponseState } from './types';
import { ComparisonTable } from './components/ComparisonTable';
import { AiAdvisor } from './components/AiAdvisor';
import { LicenseCalculator } from './components/LicenseCalculator';
import { getLicenseComparison } from './services/geminiService';
import { LayoutGrid, ArrowRightLeft, Sparkles, Zap, ShieldAlert, CheckCircle2, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const App: React.FC = () => {
  const [selectedIdA, setSelectedIdA] = useState<string>(PLANS[0].id);
  const [selectedIdB, setSelectedIdB] = useState<string>(PLANS[2].id);
  const [aiAnalysis, setAiAnalysis] = useState<AiResponseState>({ loading: false, content: null, error: null });

  const planA = PLANS.find(l => l.id === selectedIdA) || PLANS[0];
  const planB = PLANS.find(l => l.id === selectedIdB) || PLANS[2];

  const fetchComparison = async () => {
    setAiAnalysis({ loading: true, content: null, error: null });
    try {
      const result = await getLicenseComparison(planA.name, planB.name);
      setAiAnalysis({ loading: false, content: result, error: null });
    } catch (err) {
      setAiAnalysis({ loading: false, content: null, error: "Failed to load analysis" });
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <LayoutGrid className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">LicenseLens</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#calculator" className="hover:text-blue-600 transition-colors py-2 border-b-2 border-transparent hover:border-blue-600">Calculator</a>
            <a href="#compare" className="hover:text-blue-600 transition-colors py-2 border-b-2 border-transparent hover:border-blue-600">Plan Comparison</a>
            <a href="#advisor" className="hover:text-blue-600 transition-colors py-2 border-b-2 border-transparent hover:border-blue-600">AI Advisor</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Dynamic Hero Section */}
        <div className="mb-16 text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-400/20 blur-[100px] rounded-full pointer-events-none -z-10" />
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-6 shadow-sm hover:shadow-md transition-shadow cursor-default">
              <Sparkles className="w-3 h-3 text-blue-500" />
              Microsoft 365 & Office 365
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                Optimize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Microsft Licensing Costs</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                Compare plans, calculate real-world costs, and find hidden savings with our AI-powered licensing engine.
            </p>
            
            <div className="flex justify-center gap-4">
                <a href="#calculator" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 flex items-center gap-2">
                    Start Calculating <ChevronDown className="w-4 h-4" />
                </a>
            </div>
        </div>

        {/* License Calculator Section (Moved to Top) */}
        <div id="calculator" className="scroll-mt-28 mb-24">
            <LicenseCalculator />
        </div>

        {/* Comparison Section Header */}
        <div id="compare" className="scroll-mt-28 mb-10 border-t border-slate-200 pt-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">Head-to-Head Comparison</h2>
            <p className="text-slate-500 text-center max-w-xl mx-auto mb-8">Select two plans to compare their detailed feature sets, security entitlements, and limitations.</p>
        </div>

        {/* Plan Selection */}
        <div className="mb-12">
             <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mx-auto w-full max-w-4xl">
                <div className="flex-1 w-full">
                    <label className="block text-left text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 pl-1">Plan A</label>
                    <select 
                        value={selectedIdA}
                        onChange={(e) => setSelectedIdA(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    >
                        {PLANS.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                    </select>
                </div>
                
                <div className="flex items-center justify-center pt-6 sm:pt-0">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                        <ArrowRightLeft className="w-5 h-5" />
                    </div>
                </div>

                <div className="flex-1 w-full">
                    <label className="block text-left text-xs font-bold text-slate-400 uppercase tracking-wide mb-2 pl-1">Plan B</label>
                    <select 
                        value={selectedIdB}
                        onChange={(e) => setSelectedIdB(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    >
                        {PLANS.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                    </select>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
            
            {/* Left Column: Comparisons */}
            <div className="lg:col-span-8 space-y-8">
                
                {/* Quick Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-t-4 border-t-blue-500 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                             <h3 className="font-bold text-lg text-slate-800">{planA.shortName}</h3>
                             <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">{planA.category}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4 min-h-[60px]">{planA.description}</p>
                        <div className="text-sm font-semibold text-blue-600 bg-blue-50 inline-block px-3 py-1 rounded-lg">
                            {planA.price}
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-t-4 border-t-indigo-500 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                             <h3 className="font-bold text-lg text-slate-800">{planB.shortName}</h3>
                             <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">{planB.category}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4 min-h-[60px]">{planB.description}</p>
                         <div className="text-sm font-semibold text-indigo-600 bg-indigo-50 inline-block px-3 py-1 rounded-lg">
                            {planB.price}
                        </div>
                    </div>
                </div>

                {/* Main Comparison Matrix */}
                <div className="space-y-4">
                    <ComparisonTable planA={planA} planB={planB} />
                </div>

                 {/* AI Deep Dive Section */}
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
                        <div>
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-yellow-300" />
                                Consultant's Analysis
                            </h2>
                            <p className="text-sm text-blue-200 mt-1">Get an AI-powered breakdown of hidden value and security gaps.</p>
                        </div>
                        <button 
                            onClick={fetchComparison}
                            disabled={aiAnalysis.loading}
                            className="px-5 py-2.5 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-all flex items-center gap-2 disabled:opacity-70 text-sm shadow-lg transform active:scale-95"
                        >
                            {aiAnalysis.loading ? 'Analyzing...' : 'Generate Analysis'}
                        </button>
                    </div>
                    
                    {aiAnalysis.content && (
                        <div className="p-8 bg-slate-50">
                            <div className="prose prose-slate prose-sm max-w-none prose-headings:text-slate-800 prose-a:text-blue-600">
                                <ReactMarkdown>{aiAnalysis.content}</ReactMarkdown>
                            </div>
                        </div>
                    )}
                    
                    {!aiAnalysis.content && !aiAnalysis.loading && (
                         <div className="p-12 text-center bg-slate-50/50">
                            <Zap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-500 font-medium">Click "Generate Analysis" to see a professional comparison.</p>
                            <p className="text-slate-400 text-sm">Identifies features like Intune, Defender, and Virtualization Rights.</p>
                         </div>
                    )}
                </div>
            </div>

            {/* Right Column: Advisor & Tips */}
            <div className="lg:col-span-4 space-y-6">
                <div id="advisor" className="sticky top-24 space-y-6">
                    <AiAdvisor context={`${planA.name} vs ${planB.name}`} />

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5 text-orange-500" />
                            Critical Licensing Rules
                        </h3>
                        <div className="space-y-4">
                            <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                                <h4 className="text-xs font-bold text-orange-800 uppercase mb-1">Commercial Rights</h4>
                                <p className="text-xs text-orange-700 leading-relaxed">
                                    Microsoft 365 Personal/Family licenses cannot be used for business purposes. You must have a Business or Enterprise license for commercial use.
                                </p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <h4 className="text-xs font-bold text-blue-800 uppercase mb-1">The 300 Seat Limit</h4>
                                <p className="text-xs text-blue-700 leading-relaxed">
                                    Business plans (Basic, Standard, Premium) are capped at 300 users. Enterprise plans (E3, E5) have no user limit. You can mix them in one tenant.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                         <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                            Recommendation
                        </h3>
                        <p className="text-sm text-slate-600 mb-4">
                            <strong>Business Premium</strong> is often considered the "sweet spot" for SMBs (under 300 users) because it includes Intune and Defender for Business, which would cost much more if purchased separately with E3.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex gap-3 text-xs text-slate-500">
                                <span className="font-bold text-slate-700">Need Desktop Apps?</span> Avoid Business Basic.
                            </li>
                            <li className="flex gap-3 text-xs text-slate-500">
                                <span className="font-bold text-slate-700">Need &gt;50GB Email?</span> Look at E3 or Exchange Plan 2.
                            </li>
                            <li className="flex gap-3 text-xs text-slate-500">
                                <span className="font-bold text-slate-700">Need Security?</span> Business Premium or E5.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

      </main>
    </div>
  );
};

export default App;