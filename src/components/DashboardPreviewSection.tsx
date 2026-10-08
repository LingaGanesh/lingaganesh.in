import React from 'react';
import { generateForecasts, computeEDAInsights } from '../utils/mlForecaster';
import { RAW_FESTIVAL_SALES } from '../data/festivalDataset';
import { ScenarioParams, FestivalName, ProductCategory } from '../types/dataset';
import {
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Zap,
  ArrowRight,
  Sliders,
  DollarSign,
  Package,
  Layers,
  Sparkles,
  Truck,
  RotateCcw
} from 'lucide-react';

interface DashboardPreviewSectionProps {
  scenario: ScenarioParams;
  onUpdateScenario: (newScenario: Partial<ScenarioParams>) => void;
  onResetScenario: () => void;
  onNavigateTab: (tab: string) => void;
}

export const DashboardPreviewSection: React.FC<DashboardPreviewSectionProps> = ({
  scenario,
  onUpdateScenario,
  onResetScenario,
  onNavigateTab,
}) => {
  const { forecastTable, stockRisks } = generateForecasts(RAW_FESTIVAL_SALES, scenario);
  const { festivalSummary, totalHistoricalUnits, totalHistoricalRevenueCrores } =
    computeEDAInsights(RAW_FESTIVAL_SALES);

  // Aggregated forecast values
  const totalPredictedUnits = forecastTable.reduce((acc, r) => acc + r.predictedUnits, 0);
  const totalPredictedRevCrores = forecastTable.reduce((acc, r) => acc + r.revenueProjectedCrores, 0);
  const criticalStockOuts = stockRisks.filter((r) => r.currentStock < r.predictedUnits);
  const optimalCount = forecastTable.filter((r) => r.stockRisk === 'Optimal / Safe').length;
  const healthPct = Math.round((optimalCount / (forecastTable.length || 1)) * 100);

  // Festival-wise predicted volume
  const festRollup = ['Diwali', 'Dussehra', 'Holi', 'Eid', 'Pongal', 'Christmas'].map((f) => {
    const rows = forecastTable.filter((r) => r.festival === f);
    const units = rows.reduce((acc, r) => acc + r.predictedUnits, 0);
    const rev = rows.reduce((acc, r) => acc + r.revenueProjectedCrores, 0);
    return {
      festival: f as FestivalName,
      units,
      rev: Math.round(rev * 10) / 10,
    };
  });
  const maxUnits = Math.max(...festRollup.map((f) => f.units), 1);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Dashboard Preview Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-xl p-6 md:p-8 text-white shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-emerald-200 uppercase">
            <span>Executive Command Center</span>
            <span>·</span>
            <span>Amazon India Festive Operations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Executive Dashboard Preview
          </h2>
          <p className="text-sm text-emerald-100 leading-relaxed max-w-2xl">
            Live interactive telemetry synthesizing machine learning sales predictions, fulfillment center stock-out vulnerabilities, and algorithmic discount optimization across all 6 Indian festival events.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('briefing')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-emerald-900 font-bold text-xs rounded-lg hover:bg-emerald-50 transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>View GenAI Executive Briefing</span>
            </button>
            <button
              onClick={() => onNavigateTab('forecasting')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-900/60 hover:bg-emerald-900/80 text-emerald-100 border border-emerald-400/30 text-xs font-semibold rounded-lg transition-colors"
            >
              <span>Explore ML Models &amp; Formulas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Decorative subtle graphic backdrop */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
      </div>

      {/* KPI Stat Cards (White & Green Theme) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium">Total Projected Demand</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono text-[11px] font-semibold">
              +18.2% YoY
            </span>
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums tracking-tight">
            {(totalPredictedUnits / 1e6).toFixed(2)}M Units
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Across 6 Indian festive sales windows
          </span>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium">Forecast Gross GMV</span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono text-[11px] font-semibold">
              Projected
            </span>
          </div>
          <div className="text-2xl font-bold text-emerald-700 font-mono tabular-nums tracking-tight">
            ₹{totalPredictedRevCrores.toFixed(1)} Cr
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Gross merchandise value at recommended pricing
          </span>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium">Fulfillment Health Index</span>
            <span className="text-emerald-700 font-mono text-[11px] font-semibold">
              {healthPct}% Optimal
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums tracking-tight">
              {criticalStockOuts.length}
            </span>
            <span className="text-xs font-semibold text-rose-600">
              Critical Shortages
            </span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Require urgent CARP / PO buffer injection
          </span>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-emerald-300 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium">Active Scenario Tuning</span>
            <span className="text-emerald-700 font-mono text-[11px]">
              {scenario.selectedModel.toUpperCase()}
            </span>
          </div>
          <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
            Disc: {scenario.discountDeltaPct > 0 ? `+${scenario.discountDeltaPct}%` : `${scenario.discountDeltaPct}%`} · Ad: {scenario.adSpendDeltaPct > 0 ? `+${scenario.adSpendDeltaPct}%` : `${scenario.adSpendDeltaPct}%`}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Stock Buffer: {scenario.stockDeltaPct > 0 ? `+${scenario.stockDeltaPct}%` : `${scenario.stockDeltaPct}%`}
          </span>
        </div>
      </div>

      {/* Main Grid: Visual Demand Breakdown + Quick Interactive Levers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Festival Velocity Bars */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 space-y-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                Festival Demand Distribution (Units &amp; Gross GMV)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Relative volume comparison across upcoming festive campaigns
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded">
              Diwali accounts for 54.2%
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {festRollup.map((f) => {
              const pct = Math.round((f.units / maxUnits) * 100);
              return (
                <div key={f.festival} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{f.festival}</span>
                    <div className="flex items-center gap-4 font-mono tabular-nums">
                      <span className="text-slate-500">₹{f.rev} Cr</span>
                      <span className="font-bold text-emerald-700">
                        {f.units.toLocaleString()} units
                      </span>
                    </div>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(pct, 4)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
            <span>Source: Machine Learning Ensemble Model Output</span>
            <button
              onClick={() => onNavigateTab('eda')}
              className="text-emerald-700 font-semibold hover:text-emerald-800 flex items-center gap-1"
            >
              <span>View full 8-way EDA breakdowns</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Right Col: Instant Live Scenario Slider */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-1 border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-emerald-600" />
                Live Scenario Tuner
              </h3>
              <button
                onClick={onResetScenario}
                className="text-[11px] text-slate-500 hover:text-emerald-700 flex items-center gap-1"
                title="Reset sliders"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Tweak levers to see forecast update across all tabs
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Discount Slider */}
            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-slate-700">Discount Δ (%):</span>
                <span className="font-mono font-bold text-emerald-700">
                  {scenario.discountDeltaPct > 0 ? `+${scenario.discountDeltaPct}%` : `${scenario.discountDeltaPct}%`}
                </span>
              </div>
              <input
                type="range"
                min="-15"
                max="20"
                step="1"
                value={scenario.discountDeltaPct}
                onChange={(e) => onUpdateScenario({ discountDeltaPct: parseInt(e.target.value, 10) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Ad Spend Slider */}
            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-slate-700">Ad Media Budget Δ (%):</span>
                <span className="font-mono font-bold text-emerald-700">
                  {scenario.adSpendDeltaPct > 0 ? `+${scenario.adSpendDeltaPct}%` : `${scenario.adSpendDeltaPct}%`}
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="40"
                step="5"
                value={scenario.adSpendDeltaPct}
                onChange={(e) => onUpdateScenario({ adSpendDeltaPct: parseInt(e.target.value, 10) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Stock Buffer Slider */}
            <div className="space-y-1">
              <div className="flex justify-between font-medium">
                <span className="text-slate-700">Warehouse Stock Buffer Δ (%):</span>
                <span className="font-mono font-bold text-emerald-700">
                  {scenario.stockDeltaPct > 0 ? `+${scenario.stockDeltaPct}%` : `${scenario.stockDeltaPct}%`}
                </span>
              </div>
              <input
                type="range"
                min="-25"
                max="35"
                step="5"
                value={scenario.stockDeltaPct}
                onChange={(e) => onUpdateScenario({ stockDeltaPct: parseInt(e.target.value, 10) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Model Selector Pill */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-500 block mb-1.5 font-medium">Model Engine:</span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                {[
                  { id: 'ensemble', label: 'Ensemble' },
                  { id: 'random_forest', label: 'Random Forest' },
                  { id: 'linear_regression', label: 'Linear Reg.' },
                  { id: 'time_series', label: 'Holt-Winters' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => onUpdateScenario({ selectedModel: m.id as any })}
                    className={`py-1.5 px-2 rounded text-center transition-colors font-medium ${
                      scenario.selectedModel === m.id
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200/60 rounded-lg text-[11px] text-emerald-900 leading-snug">
            <strong>Elasticity Note:</strong> Fashion responds fastest to discount changes ($E_p = -2.35$), while Electronics and Mobiles react to bundled financing and ad impressions.
          </div>
        </div>
      </div>

      {/* Critical Stock-Out Alert Watchlist */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Stock-Out Risk Watchlist ({criticalStockOuts.length} Categories Alerted)
              </h3>
              <p className="text-xs text-slate-500">
                Categories where forecast demand outstrips current FC opening inventory
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('forecasting')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>Full Safety Stock Math</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {criticalStockOuts.slice(0, 3).map((risk) => (
            <div
              key={`${risk.festival}-${risk.category}`}
              className="p-4 rounded-lg bg-rose-50/50 border border-rose-200 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm">
                  {risk.festival}
                </span>
                <span className="font-mono font-bold text-rose-700">
                  -{Math.abs(risk.deficitOrSurplus).toLocaleString()} units
                </span>
              </div>
              <span className="text-slate-700 font-medium block">
                {risk.category}
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-2">
                {risk.rootCause}
              </p>
              <div className="pt-2 border-t border-rose-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Lead Time: {risk.leadTimeDays}d</span>
                <span className="text-emerald-800 font-semibold">Inject Buffer</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fast Navigation Shortcut Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            tab: 'briefing',
            title: '1. Executive Briefing',
            subtitle: '5 Simple Insights & Official Table',
            icon: Sparkles,
            color: 'text-emerald-700',
          },
          {
            tab: 'data_understanding',
            title: '2. Data & Preprocessing',
            subtitle: '11 Columns, Schema & Clean Data',
            icon: Layers,
            color: 'text-teal-700',
          },
          {
            tab: 'forecasting',
            title: '3. ML Forecasting & Safety Stock',
            subtitle: 'RF, Ridge, SS = Z * σ * √L Math',
            icon: ShieldCheck,
            color: 'text-emerald-700',
          },
          {
            tab: 'presentation',
            title: '4. College Viva / Deck',
            subtitle: '12 Slides & Viva Voce Q&A Cheat Sheet',
            icon: Zap,
            color: 'text-teal-700',
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.tab}
              onClick={() => onNavigateTab(item.tab)}
              className="p-4 bg-white border border-slate-200 rounded-xl text-left hover:border-emerald-400 hover:shadow-xs transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-5 h-5 ${item.color}`} />
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-700 transition-colors" />
              </div>
              <span className="font-bold text-sm text-slate-900 block group-hover:text-emerald-800 transition-colors">
                {item.title}
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                {item.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
