import React, { useState } from 'react';
import { askLicenseAdvisor } from '../services/geminiService';
import { Send, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const AiAdvisor: React.FC<{ context?: string }> = ({ context }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    const result = await askLicenseAdvisor(question, context);
    setAnswer(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-blue-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-blue-600 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
            <h3 className="text-lg font-bold text-slate-800">License Advisor</h3>
            <p className="text-sm text-slate-500">Powered by Gemini AI</p>
        </div>
      </div>

      <div className="mb-6 h-64 overflow-y-auto pr-2 custom-scrollbar">
        {answer ? (
          <div className="prose prose-sm prose-blue max-w-none bg-white p-4 rounded-xl shadow-sm border border-blue-100">
            <ReactMarkdown>{answer}</ReactMarkdown>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 p-4 border-2 border-dashed border-blue-200 rounded-xl">
             <AlertCircle className="w-8 h-8 mb-2 opacity-50" />
             <p className="text-sm">Ask questions like "Can I use GPL in a commercial app?" or "What is a copyleft license?"</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about licensing..."
          className="w-full pl-4 pr-12 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="absolute right-2 top-2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </form>
    </div>
  );
};
