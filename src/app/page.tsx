'use client';
import { useState, useRef, useEffect } from 'react';
import data from '../data.json';

function cleanTitle(fullTitle) {
  if (!fullTitle) return '';
  // Remove GitHub prefix and username (e.g., "GitHub - username/repo" -> "repo")
  let cleaned = fullTitle.replace(/^GitHub - [^/]+\//i, '');
  // Also remove "GitHub - " if it's just that
  cleaned = cleaned.replace(/^GitHub - /i, '');
  
  // Split by common separators (- | : — – ·) and take the first part
  const parts = cleaned.split(/[-|:—–·]/);
  return parts[0].trim();
}

function ToolCard({ tool, onClick }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsFlipped(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
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
      <div className={`w-full h-full transition-all duration-700 preserve-3d ${isFlipped ? 'rotate-y-180 scale-105' : 'scale-100'}`}>
        
        {/* FRONT OF CARD */}
        <div className="absolute inset-0 backface-hidden bg-white/70 dark:bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-white/[0.05] overflow-hidden shadow-sm group-hover:shadow-xl dark:group-hover:shadow-2xl dark:group-hover:shadow-white/[0.02] group-hover:-translate-y-1 group-hover:bg-white dark:group-hover:bg-white/[0.04] transition-all duration-300 flex flex-col z-10">
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex flex-wrap items-start gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-gray-100/80 dark:bg-white/[0.05] text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-white/[0.05]">
                {tool.category}
              </span>
            </div>
            <div className="flex items-center gap-4 mb-3">
              {tool.icon ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${tool.icon}`} alt="favicon" className="w-9 h-9 rounded-xl bg-white dark:bg-white/5 border border-gray-200/50 dark:border-white/[0.1] object-contain p-1 shadow-sm" />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/[0.05] border border-gray-200/50 dark:border-white/[0.1] flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-sm uppercase shadow-sm">
                  {displayName.substring(0, 1)}
                </div>
              )}
              <h3 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-black dark:group-hover:text-white transition-colors" title={tool.title}>
                {displayName}
              </h3>
            </div>
            {tool.description && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400/80 line-clamp-2 leading-relaxed" title={tool.description}>
                {tool.description}
              </p>
            )}
          </div>
          <div className="bg-gray-50/50 dark:bg-black/20 px-5 py-3 border-t border-gray-100 dark:border-white/[0.02] flex items-center justify-between backdrop-blur-md">
            <span className="text-xs font-semibold tracking-wide text-gray-900 dark:text-white opacity-0 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">View Details &rarr;</span>
            <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
              {tool.websiteUrl && <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>}
              {tool.githubUrl && <span className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)]"></span>}
            </div>
          </div>
        </div>

        {/* BACK OF CARD (Flipped State) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#0A0A0A] rounded-2xl border border-white/[0.1] overflow-hidden shadow-2xl flex flex-col items-center p-6 text-center z-20">
           {/* Subtle glow behind the icon */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 blur-[40px] rounded-full pointer-events-none"></div>
           
           <div className="absolute top-4 left-4">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-bold bg-white/[0.05] text-gray-300 border border-white/[0.05] uppercase tracking-widest">
                {tool.category}
              </span>
           </div>
           
           <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 mt-6 shadow-[0_0_15px_rgba(255,255,255,0.1)] overflow-hidden p-1 z-10">
              {tool.icon ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${tool.icon}`} alt="favicon" className="w-full h-full object-contain" />
              ) : (
                <span className="text-lg font-bold text-black">{displayName.substring(0, 1)}</span>
              )}
           </div>
           <h3 className={`font-semibold text-white mb-1 line-clamp-1 z-10 tracking-tight ${isLongTitle ? 'text-sm' : 'text-base'}`}>
             {displayName}
           </h3>
           <p className="text-gray-400 text-xs mb-5 font-medium px-4 opacity-60 z-10">Click to open full overview</p>
           
           <div className="flex justify-center gap-3 mt-auto w-full z-10 px-2">
              {tool.websiteUrl && <span className="flex-1 py-1.5 bg-white text-black rounded-lg text-xs font-bold transition-transform hover:scale-105 shadow-md">Website</span>}
              {tool.githubUrl && <span className="flex-1 py-1.5 bg-white/[0.1] border border-white/[0.1] text-white rounded-lg text-xs font-bold transition-transform hover:scale-105 shadow-md">GitHub</span>}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 dark:bg-black/80 backdrop-blur-md transition-all" onClick={() => setSelectedTool(null)}>
          <div 
            className="bg-white dark:bg-[#0F0F0F] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col border border-gray-200 dark:border-white/[0.05]"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="p-10 border-b border-gray-100 dark:border-white/[0.02] relative bg-gray-50/50 dark:bg-white/[0.01]">
              <button 
                onClick={() => setSelectedTool(null)}
                className="absolute top-6 right-6 p-2.5 bg-white dark:bg-white/[0.05] hover:bg-gray-100 dark:hover:bg-white/[0.1] border border-gray-200/50 dark:border-white/[0.05] rounded-full text-gray-500 dark:text-gray-400 transition-colors shadow-sm"
              >
                ✕
              </button>
              
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-gray-200/50 dark:bg-white/[0.05] text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-white/[0.05] mb-6">
                {selectedTool.category}
              </span>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-2">
                {selectedTool.icon ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${selectedTool.icon}`} alt="favicon" className="w-20 h-20 rounded-2xl bg-white dark:bg-white/5 border border-gray-200/50 dark:border-white/[0.1] object-contain p-2 shrink-0 shadow-sm" />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-white/[0.05] border border-gray-200/50 dark:border-white/[0.1] flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-3xl uppercase shrink-0 shadow-sm">
                    {cleanTitle(selectedTool.title).substring(0, 1)}
                  </div>
                )}
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight mb-2">
                    {cleanTitle(selectedTool.title)}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Curated resource from your master directory</p>
                </div>
              </div>
            </div>
            
            <div className="p-10 flex-1 bg-white dark:bg-transparent">
              <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">About this tool</h4>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                {selectedTool.description}
              </p>
            </div>
            
            <div className="p-8 sm:p-10 bg-gray-50 dark:bg-white/[0.01] border-t border-gray-100 dark:border-white/[0.02] flex flex-col sm:flex-row gap-4">
              {selectedTool.websiteUrl && (
                <a 
                  href={selectedTool.websiteUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 flex justify-center items-center py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold tracking-wide rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  Visit Official Website
                </a>
              )}
              {selectedTool.githubUrl && (
                <a 
                  href={selectedTool.githubUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 flex justify-center items-center py-4 px-6 bg-gray-900 dark:bg-white hover:bg-black dark:hover:bg-gray-200 text-white dark:text-black text-sm font-bold tracking-wide rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
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
