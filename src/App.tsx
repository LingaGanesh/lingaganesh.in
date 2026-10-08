/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TopNav } from './components/TopNav';
import { DashboardPreviewSection } from './components/DashboardPreviewSection';
import { DatasetUnderstandingSection } from './components/DatasetUnderstandingSection';
import { EdaDashboardSection } from './components/EdaDashboardSection';
import { ForecastEngineSection } from './components/ForecastEngineSection';
import { GenAiBriefingSection } from './components/GenAiBriefingSection';
import { BusinessStrategySection } from './components/BusinessStrategySection';
import { CollegePresentationSection } from './components/CollegePresentationSection';
import { ScenarioModal } from './components/ScenarioModal';
import { PythonCodeModal } from './components/PythonCodeModal';
import { ScenarioParams } from './types/dataset';
import { Sparkles, SlidersHorizontal, Code2, ArrowRight, LayoutDashboard } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard_preview');
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState<boolean>(false);
  const [isPythonModalOpen, setIsPythonModalOpen] = useState<boolean>(false);

  // Scenario state
  const [scenario, setScenario] = useState<ScenarioParams>({
    discountDeltaPct: 0,
    adSpendDeltaPct: 0,
    stockDeltaPct: 0,
    activeFestival: 'All',
    selectedRegion: 'All',
    selectedModel: 'ensemble',
  });

  const handleUpdateScenario = (newScenario: Partial<ScenarioParams>) => {
    setScenario((prev) => ({ ...prev, ...newScenario }));
  };

  const handleResetScenario = () => {
    setScenario({
      discountDeltaPct: 0,
      adSpendDeltaPct: 0,
      stockDeltaPct: 0,
      activeFestival: 'All',
      selectedRegion: 'All',
      selectedModel: 'ensemble',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* 3-Zone Top Navigation (White & Green Theme) */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenScenarioModal={() => setIsScenarioModalOpen(true)}
        onOpenPythonModal={() => setIsPythonModalOpen(true)}
      />

      {/* Hero Context Banner (Clean White & Emerald Accent) */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-mono font-semibold tracking-wide">
                <span>AMAZON INDIA</span>
                <span aria-hidden="true">·</span>
                <span>DATA SCIENCE &amp; GENERATIVE AI CONSULTING</span>
                <span aria-hidden="true">·</span>
                <span>FESTIVE DEMAND FORECASTING</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 text-balance">
                Sales Prediction Analysis during Festivals Using AI / Generative AI at Amazon
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                End-to-end analytical portal predicting demand surges across <strong className="text-emerald-800">Diwali, Dussehra, Holi, Eid, Pongal, and Christmas</strong>. Empowers inventory managers, marketing leads, and logistics heads to mitigate stock-outs and calibrate discounts.
              </p>
            </div>

            {/* Quick Scope Cards */}
            <div className="flex flex-wrap lg:flex-nowrap gap-3 text-xs shrink-0">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 w-36 shadow-xs">
                <span className="text-slate-500 block text-[11px] mb-0.5 font-medium">Festivals</span>
                <span className="font-bold text-slate-900">6 Indian Peaks</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Diwali to Pongal</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 w-36 shadow-xs">
                <span className="text-slate-500 block text-[11px] mb-0.5 font-medium">AI Engine</span>
                <span className="font-bold text-emerald-700">Ensemble + GenAI</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">RF, Ridge, Gemini</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 w-36 shadow-xs">
                <span className="text-slate-500 block text-[11px] mb-0.5 font-medium">Focus Areas</span>
                <span className="font-bold text-slate-900">Inventory &amp; ATS</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Safety Stock, ROAS</span>
              </div>
            </div>
          </div>

          {/* Quick Stage Tabs Bar */}
          <div className="flex overflow-x-auto gap-1.5 pt-5 mt-4 border-t border-slate-100 text-xs">
            {[
              { id: 'dashboard_preview', label: 'Executive Dashboard Preview' },
              { id: 'briefing', label: 'Executive Briefing & Output (Steps 7 & 8)' },
              { id: 'data_understanding', label: 'Data Understanding & Preprocessing (Steps 1 & 2)' },
              { id: 'eda', label: 'Exploratory Data Analysis (Step 3)' },
              { id: 'forecasting', label: 'Forecasting & Stock-Out Risk (Steps 4, 5, 6)' },
              { id: 'strategy', label: 'Amazon Business Strategy (Step 9)' },
              { id: 'presentation', label: 'College Project & Viva Deck (Step 10)' },
            ].map((stage) => (
              <button
                key={stage.id}
                onClick={() => setActiveTab(stage.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeTab === stage.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {stage.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard_preview' && (
          <DashboardPreviewSection
            scenario={scenario}
            onUpdateScenario={handleUpdateScenario}
            onResetScenario={handleResetScenario}
            onNavigateTab={setActiveTab}
          />
        )}
        {activeTab === 'briefing' && <GenAiBriefingSection scenario={scenario} />}
        {activeTab === 'data_understanding' && <DatasetUnderstandingSection />}
        {activeTab === 'eda' && <EdaDashboardSection />}
        {activeTab === 'forecasting' && (
          <ForecastEngineSection scenario={scenario} onUpdateScenario={handleUpdateScenario} />
        )}
        {activeTab === 'strategy' && <BusinessStrategySection />}
        {activeTab === 'presentation' && <CollegePresentationSection />}
      </main>

      {/* Modals */}
      <ScenarioModal
        isOpen={isScenarioModalOpen}
        onClose={() => setIsScenarioModalOpen(false)}
        scenario={scenario}
        onUpdateScenario={handleUpdateScenario}
        onResetScenario={handleResetScenario}
      />

      <PythonCodeModal
        isOpen={isPythonModalOpen}
        onClose={() => setIsPythonModalOpen(false)}
      />

      {/* Quiet Corporate / Academic Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Amazon Sales Science Hub</span>
            <span aria-hidden="true">·</span>
            <span>M.Sc. Data Science Project Reference Architecture</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Historical Ground Truth Partitioned</span>
            <span aria-hidden="true">·</span>
            <span>Strict Zero-Hallucination Grounding</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
