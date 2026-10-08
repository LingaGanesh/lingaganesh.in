import React from 'react';
import { SlidersHorizontal, Code2, LayoutDashboard } from 'lucide-react';

interface TopNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenScenarioModal: () => void;
  onOpenPythonModal: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenScenarioModal,
  onOpenPythonModal,
}) => {
  const navItems = [
    { id: 'dashboard_preview', label: 'Dashboard Preview' },
    { id: 'briefing', label: 'Executive Output' },
    { id: 'data_understanding', label: 'Data & Preprocessing' },
    { id: 'eda', label: 'EDA Insights' },
    { id: 'forecasting', label: 'ML Forecasting & Stock Risk' },
    { id: 'strategy', label: 'Amazon Strategy' },
    { id: 'presentation', label: 'Project Deck / Viva' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('dashboard_preview')}
              className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Amazon Festive Sales AI Hub</span>
            </button>
          </div>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-emerald-800 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenScenarioModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-md transition-colors whitespace-nowrap shadow-xs"
              title="Adjust forecast variables (Discounts, Ads, Stock)"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Scenario Simulator</span>
            </button>

            <button
              onClick={onOpenPythonModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-md transition-colors whitespace-nowrap shadow-xs"
              title="View clean Python data science scripts"
            >
              <Code2 className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">Python Code</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
