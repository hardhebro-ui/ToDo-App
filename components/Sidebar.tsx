
import React from 'react';
import type { FilterType } from '../types';
import { Filter } from '../types';
import { LogoIcon } from './Icons';

interface SidebarProps {
    currentFilter: FilterType;
    setFilter: (filter: FilterType) => void;
    counts: Record<FilterType, number>;
    // FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
    icons: Record<FilterType, React.ReactElement>;
}

const Sidebar: React.FC<SidebarProps> = ({ currentFilter, setFilter, counts, icons }) => {
    const filters = Object.values(Filter);

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-700/60 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-10">
                <LogoIcon className="w-8 h-8 text-indigo-400" />
                <h1 className="text-xl font-bold text-white">Zenith Tasks</h1>
            </div>
            <nav className="flex flex-col gap-2">
                {filters.map(filter => (
                    <button
                        key={filter}
                        onClick={() => setFilter(filter)}
                        className={`flex items-center justify-between px-4 py-2 rounded-lg text-left transition-colors duration-200 ${
                            currentFilter === filter
                                ? 'bg-indigo-600 text-white font-semibold'
                                : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            {icons[filter]}
                            <span>{filter}</span>
                        </div>
                        <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                            currentFilter === filter ? 'bg-indigo-400/50' : 'bg-slate-700'
                        }`}>
                            {counts[filter]}
                        </span>
                    </button>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;