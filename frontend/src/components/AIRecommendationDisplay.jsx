import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, Bot, AlertCircle, RefreshCw, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const AIRecommendationDisplay = () => {
  const [employees, setEmployees] = useState([]);
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/employees', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(data);
    } catch (error) {
      console.error('Failed to fetch employees', error);
      setError('Failed to load employee data required for AI analysis.');
    }
  };

  const generateRecommendations = async () => {
    if (employees.length === 0) {
      setError('No employees available to analyze.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(
        '/api/ai/recommend',
        { employees },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecommendations(data.recommendation);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate AI recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animation-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
              EvoHR AI Insights
            </h1>
            <p className="text-gray-400 mt-1">Intelligent performance analytics and promotion modeling.</p>
          </div>
        </div>

        <button 
          onClick={generateRecommendations} 
          disabled={loading || employees.length === 0}
          className="btn-primary flex items-center gap-2 group relative overflow-hidden"
        >
          {loading ? (
            <>
              <RefreshCw size={20} className="animate-spin" />
              Generating Insights...
            </>
          ) : (
            <>
              <Zap size={20} className="group-hover:animate-pulse" />
              Generate AI Report
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-4 rounded-xl mb-8 flex items-center gap-3 backdrop-blur-md">
          <AlertCircle size={24} />
          <p>{error}</p>
        </div>
      )}

      {/* AI Stats Overview */}
      {employees.length > 0 && !recommendations && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-panel p-6 border-l-4 border-l-indigo-500">
            <div className="text-gray-400 text-sm font-medium mb-1">Data Points Ready</div>
            <div className="text-3xl font-bold text-white">{employees.length}</div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><CheckCircle2 size={12}/> Employee Profiles</p>
          </div>
          <div className="glass-panel p-6 border-l-4 border-l-purple-500">
            <div className="text-gray-400 text-sm font-medium mb-1">Analysis Model</div>
            <div className="text-2xl font-bold text-white mt-1">EvoAI v2.0</div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><CheckCircle2 size={12}/> Ready for processing</p>
          </div>
          <div className="glass-panel p-6 border-l-4 border-l-emerald-500 relative overflow-hidden">
            <div className="text-gray-400 text-sm font-medium mb-1">Estimated Time</div>
            <div className="text-3xl font-bold text-white">~5s</div>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><CheckCircle2 size={12}/> Optimized inference</p>
            <Bot size={80} className="absolute -right-4 -bottom-4 text-emerald-500/10" />
          </div>
        </div>
      )}

      {loading && (
        <div className="glass-panel p-16 text-center flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 rounded-full border-t-2 border-indigo-500 animate-spin"></div>
            <Bot size={40} className="text-indigo-200 animate-pulse" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2 tracking-wide">Analyzing Matrix...</h2>
          <p className="text-gray-400 max-w-md">Our AI is processing performance metrics, skill overlaps, and experience levels to generate actionable insights.</p>
        </div>
      )}

      {recommendations && !loading && (
        <div className="glass-panel relative overflow-hidden">
          {/* Decorative background for the report */}
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"></div>
          
          <div className="p-8 md:p-10">
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Bot className="text-indigo-500" /> Strategic AI Report
                </h2>
                <p className="text-gray-400 text-sm mt-1">Generated based on current employee data metrics</p>
              </div>
              <div className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-200 text-sm font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
                AI Verified
              </div>
            </div>

            <div className="prose prose-invert prose-brand max-w-none 
              prose-headings:font-bold prose-headings:text-white
              prose-h1:text-3xl prose-h1:border-b prose-h1:border-white/10 prose-h1:pb-4
              prose-h2:text-2xl prose-h2:text-indigo-200 prose-h2:mt-8
              prose-h3:text-xl prose-h3:text-purple-300
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-li:text-gray-300
              prose-strong:text-white prose-strong:font-semibold
              prose-a:text-indigo-200 hover:prose-a:text-white
              prose-blockquote:border-l-indigo-500 prose-blockquote:bg-white/5 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
              prose-table:border prose-table:border-white/10 prose-th:bg-white/5 prose-td:border-white/10"
            >
              <ReactMarkdown>{recommendations}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendationDisplay;
