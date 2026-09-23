'use client';
import { useState, useRef, useEffect } from 'react';
import data from '../data.json';

function cleanTitle(fullTitle) {
  if (!fullTitle) return '';
  // Remove GitHub prefix and username (e.g., "GitHub - username/repo" -> "repo")
  let cleaned = fullTitle.replace(/^GitHub - [^/]+\//i, '');
  // Also remove "GitHub - " if it's just that
  cleaned = cleaned.replace(/^GitHub - /i, '');
  
  // Split by common separators (- | :) and take the first part
  const parts = cleaned.split(/[-|:]/);
  return parts[0].trim();
}

function ToolCard({ tool, onClick }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    // Start a 1-second timer to flip the card
    timerRef.current = setTimeout(() => {
      setIsFlipped(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsFlipped(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const displayName = cleanTitle(tool.title);
  const isLongTitle = displayName.length > 20;

  return (
    <div 
      className="perspective-1000 relative w-full h-[220px] cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className={`w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* FRONT OF CARD */}
        <div className="absolute inset-0 backface-hidden bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm group-hover:shadow-lg group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-all flex flex-col">
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex flex-wrap items-start gap-2 mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50">
                {tool.category}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              {tool.icon ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={tool.icon} alt="favicon" className="w-8 h-8 rounded-md bg-white border border-gray-100 dark:border-gray-600 object-contain p-0.5" />
              ) : (
                <div className="w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-300 font-bold text-xs uppercase">
                  {displayName.substring(0, 1)}
                </div>
              )}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" title={tool.title}>
                {displayName}
              </h3>
            </div>
            {tool.description && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3" title={tool.description}>
                {tool.description}
              </p>
            )}
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">View Details →</span>
            <div className="flex gap-2">
              {tool.websiteUrl && <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]"></span>}
              {tool.githubUrl && <span className="w-2 h-2 rounded-full bg-gray-800 dark:bg-white shadow-[0_0_5px_rgba(255,255,255,0.2)]"></span>}
            </div>
          </div>
        </div>

        {/* BACK OF CARD (Flipped State) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-slate-800 to-slate-950 dark:from-slate-900 dark:to-black rounded-xl border border-slate-700 overflow-hidden shadow-2xl flex flex-col items-center p-6 text-center">
           <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                {tool.category}
              </span>
           </div>
           
           <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-3 mt-4 shadow-lg overflow-hidden p-1">
              {tool.icon ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={tool.icon} alt="favicon" className="w-full h-full object-contain" />
              ) : (
                <span className="text-xl font-bold text-slate-800">{displayName.substring(0, 1)}</span>
              )}
           </div>
           <h3 className={`font-bold text-white mb-1 line-clamp-2 ${isLongTitle ? 'text-base' : 'text-xl'}`}>
             {displayName}
           </h3>
           <p className="text-slate-400 text-xs mb-4 font-medium px-4 opacity-70">Click to open full overview</p>
           
           <div className="flex flex-wrap justify-center gap-2 mt-auto w-full">
              {tool.websiteUrl && <span className="flex-1 py-1.5 bg-blue-500 hover:bg-blue-600 border border-blue-400 text-white rounded-md text-xs font-semibold transition-colors">Website</span>}
              {tool.githubUrl && <span className="flex-1 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-md text-xs font-semibold transition-colors">GitHub</span>}
           </div>
        </div>

      </div>
    </div>
  );
}

import MorphText from '../components/MorphText';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedTool, setSelectedTool] = useState(null);

  const categories = ['All', ...Array.from(new Set(data.map(item => item.category)))].sort();

  let allTools = [];
  const dedupMap = new Map();
  
  data.forEach(category => {
    category.tools.forEach(tool => {
      const cleaned = cleanTitle(tool.title);
      const key = `${tool.category}-${cleaned.toLowerCase()}`;
      
      if (dedupMap.has(key)) {
        const existing = dedupMap.get(key);
        if (tool.githubUrl && !existing.githubUrl) existing.githubUrl = tool.githubUrl;
        if (tool.websiteUrl && !existing.websiteUrl) existing.websiteUrl = tool.websiteUrl;
      } else {
        dedupMap.set(key, { ...tool, displayTitle: cleaned });
      }
    });
  });
  
  allTools = Array.from(dedupMap.values());

  const filteredTools = allTools.filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch = tool.displayTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (tool.description && tool.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    let matchesType = true;
    if (filterType === 'github') matchesType = !!tool.githubUrl;
    if (filterType === 'website') matchesType = !!tool.websiteUrl;
    
    return matchesCategory && matchesSearch && matchesType;
  });

  return (
    <div className="flex h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-500/30 transition-colors duration-300">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl border-r border-gray-200/50 dark:border-white/[0.05] overflow-y-auto hidden md:block transition-colors duration-300 z-30">
        <div className="p-6 sticky top-0 bg-white/80 dark:bg-black/20 backdrop-blur-md z-10 border-b border-gray-100 dark:border-white/[0.05]">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Dev Directory
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-widest font-medium">Curated Stack</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-0.5">
            {categories.map((cat) => (
              <li key={cat}>
                <button 
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    selectedCategory === cat 
                      ? 'bg-black text-white dark:bg-white dark:text-black font-semibold shadow-md' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/[0.05] hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* HEADER */}
        <header className="bg-white/50 dark:bg-white/[0.02] backdrop-blur-xl border-b border-gray-200/50 dark:border-white/[0.05] px-8 py-4 flex items-center justify-between z-20 sticky top-0 transition-colors duration-300">
          <div className="relative w-full max-w-xl group">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text" 
              placeholder="Search tools, platforms, frameworks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100/50 dark:bg-black/50 border border-gray-200/50 dark:border-white/[0.1] rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 transition-all shadow-inner"
            />
          </div>
          <div className="flex space-x-2 ml-4">
            <button onClick={() => setFilterType('all')} className={`px-4 py-2 text-xs font-semibold tracking-wide rounded-lg border transition-all ${filterType === 'all' ? 'bg-black dark:bg-white text-white dark:text-black border-transparent shadow-md' : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/[0.1] hover:bg-gray-100 dark:hover:bg-white/[0.05]'}`}>All</button>
            <button onClick={() => setFilterType('github')} className={`px-4 py-2 text-xs font-semibold tracking-wide rounded-lg border transition-all ${filterType === 'github' ? 'bg-black dark:bg-white text-white dark:text-black border-transparent shadow-md' : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/[0.1] hover:bg-gray-100 dark:hover:bg-white/[0.05]'}`}>GitHub</button>
            <button onClick={() => setFilterType('website')} className={`px-4 py-2 text-xs font-semibold tracking-wide rounded-lg border transition-all ${filterType === 'website' ? 'bg-black dark:bg-white text-white dark:text-black border-transparent shadow-md' : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/[0.1] hover:bg-gray-100 dark:hover:bg-white/[0.05]'}`}>Website</button>
          </div>
        </header>

        {/* GRID CONTAINER */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          
          {/* Subtle Background Gradients */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-purple-500/5 dark:bg-purple-500/10 blur-[100px] rounded-full"></div>
          </div>

          {selectedCategory === 'All' && !searchQuery && (
            <div className="py-16 pb-24 w-full flex justify-center items-center">
               <MorphText 
                 words={['WELCOME', 'TO', 'DEV DIRECTORY']} 
                 subtext="Perfectly curated resources for modern developers"
               />
            </div>
          )}

          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">{selectedCategory}</h2>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full border border-gray-200 dark:border-white/[0.05]">
              {filteredTools.length} {filteredTools.length === 1 ? 'result' : 'results'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                onClick={() => setSelectedTool(tool)} 
              />
            ))}
          </div>
        </div>
      </main>

      {/* Interactive Detail Modal */}
      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm" onClick={() => setSelectedTool(null)}>
          <div 
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col border border-gray-200 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="p-8 border-b border-gray-100 dark:border-gray-800 relative">
              <button 
                onClick={() => setSelectedTool(null)}
                className="absolute top-6 right-6 p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400 transition-colors"
              >
                ✕
              </button>
              
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50 mb-4">
                {selectedTool.category}
              </span>
              
              <div className="flex items-start gap-4 mb-2">
                {selectedTool.icon ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={selectedTool.icon} alt="favicon" className="w-14 h-14 rounded-xl bg-white border border-gray-100 dark:border-gray-700 object-contain p-1 shrink-0 shadow-sm" />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-xl uppercase shrink-0">
                    {cleanTitle(selectedTool.title).substring(0, 1)}
                  </div>
                )}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                  {cleanTitle(selectedTool.title)}
                </h2>
              </div>
            </div>
            
            <div className="p-8 flex-1 bg-white dark:bg-gray-900">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-300 uppercase tracking-wider mb-3">About this tool</h4>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                {selectedTool.description}
              </p>
            </div>
            
            <div className="p-8 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4">
              {selectedTool.websiteUrl && (
                <a 
                  href={selectedTool.websiteUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 flex justify-center items-center py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  Visit Official Website
                </a>
              )}
              {selectedTool.githubUrl && (
                <a 
                  href={selectedTool.githubUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 flex justify-center items-center py-3 px-6 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-200 text-white dark:text-gray-900 text-base font-semibold rounded-xl transition-all shadow-sm hover:shadow-md"
                >
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
