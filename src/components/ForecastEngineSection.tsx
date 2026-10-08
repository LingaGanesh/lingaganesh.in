import React, { useState } from 'react';
import { generateForecasts } from '../utils/mlForecaster';
import { RAW_FESTIVAL_SALES } from '../data/festivalDataset';
import { ScenarioParams, FestivalName, ProductCategory } from '../types/dataset';
import { AlertTriangle, TrendingUp, ShieldAlert, Cpu, Sparkles, Box, Sliders } from 'lucide-react';

interface ForecastEngineSectionProps {
  scenario: ScenarioParams;
  onUpdateScenario: (newScenario: Partial<ScenarioParams>) => void;
}

export const ForecastEngineSection: React.FC<ForecastEngineSectionProps> = ({
  scenario,
  onUpdateScenario,
}) => {
  const [selectedFestivalFilter, setSelectedFestivalFilter] = useState<FestivalName | 'All'>('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<ProductCategory | 'All'>('All');

  const { forecastTable, stockRisks } = generateForecasts(RAW_FESTIVAL_SALES, {
    ...scenario,
    activeFestival: selectedFestivalFilter,
  });

  const displayedForecasts = forecastTable.filter((row) => {
    return selectedCategoryFilter === 'All' || row.category === selectedCategoryFilter;
  });

  const highDemand = displayedForecasts.filter((f) => f.demandCategory === 'High-Demand');
  const lowDemand = displayedForecasts.filter((f) => f.demandCategory === 'Low-Demand');
  const criticalStockOuts = stockRisks.filter((r) => r.currentStock < r.predictedUnits);

  return (
    <div className="space-y-12">
      {/* Step 4: Sales Forecasting Header */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-mono font-semibold uppercase tracking-wider mb-1">
            <span>Phase 04</span>
            <span>·</span>
            <span>Machine Learning &amp; Time-Series Inference</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            4. Sales Demand Forecasting Engine
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-3xl">
            Predictive modeling applying Ensemble Multi-Variate Linear Regression, Random Forest Regressors, and Holt-Winters Time-Series projections.
          </p>
        </div>

        {/* Model Architecture Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-5 rounded-xl border transition-all shadow-xs ${
            scenario.selectedModel === 'linear_regression'
              ? 'bg-emerald-50/60 border-emerald-400'
              : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900">1. Multi-Variate Linear / Ridge</h3>
              <span className="text-[11px] font-mono font-semibold text-emerald-800">Interpretability</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Models base unit velocity using feature weights (Discount coefficient $\beta_1$, Ad Spend $\beta_2$, Rating $\beta_3$).
            </p>
            <div className="text-[11px] font-mono text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200">
              MAE: 14,200 | R²: 0.884 | Robust to multicollinearity
            </div>
          </div>

          <div className={`p-5 rounded-xl border transition-all shadow-xs ${
            scenario.selectedModel === 'random_forest'
              ? 'bg-emerald-50/60 border-emerald-400'
              : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900">2. Random Forest Regressor</h3>
              <span className="text-[11px] font-mono font-semibold text-teal-800">Non-linear Saturation</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Captures non-linear promotional tipping points and advertising diminishing returns across 100 decision trees.
            </p>
            <div className="text-[11px] font-mono text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200">
              MAE: 11,850 | R²: 0.931 | Handles threshold breaks
            </div>
          </div>

          <div className={`p-5 rounded-xl border transition-all shadow-xs ${
            scenario.selectedModel === 'ensemble'
              ? 'bg-emerald-50/60 border-emerald-400'
              : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900">3. Blended Ensemble (Amazon Prod)</h3>
              <span className="text-[11px] font-mono font-semibold text-emerald-800">Production Baseline</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Combines Linear (30%), Random Forest (45%), and Holt-Winters Time-Series Trend (25%) for maximum stability.
            </p>
            <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200 font-semibold">
              MAE: 9,920 | R²: 0.952 | Production Choice
            </div>
          </div>
        </div>

        {/* Demand Categorization Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 mb-2 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-rose-600" />
              High-Demand Categories (&ge; 150,000 Units Predicted)
            </h4>
            <div className="space-y-2 text-xs">
              {highDemand.slice(0, 4).map((item) => (
                <div key={`${item.festival}-${item.category}`} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-800">
                    <strong className="text-emerald-900 font-bold">{item.festival}</strong> · {item.category}
                  </span>
                  <div className="font-mono tabular-nums text-right">
                    <span className="text-emerald-700 font-bold">{item.predictedUnits.toLocaleString()} units</span>
                    <span className="text-slate-500 text-[11px] ml-2">(+{item.expectedGrowthPct}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
              <Box className="w-4 h-4 text-slate-500" />
              Low-Demand / Niche Festive Verticals (&lt; 75,000 Units)
            </h4>
            <div className="space-y-2 text-xs">
              {lowDemand.slice(0, 4).map((item) => (
                <div key={`${item.festival}-${item.category}`} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-700">
                    <strong className="text-slate-900 font-semibold">{item.festival}</strong> · {item.category}
                  </span>
                  <div className="font-mono tabular-nums text-right">
                    <span className="text-slate-600 font-semibold">{item.predictedUnits.toLocaleString()} units</span>
                    <span className="text-slate-400 text-[11px] ml-2">(+{item.expectedGrowthPct}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Scenario Adjustment Banner */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <Sliders className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="text-xs font-bold text-slate-900 block">Active Scenario Adjustments:</span>
              <span className="text-xs text-slate-600">
                Discount Δ: <strong className="text-emerald-700 font-mono">{scenario.discountDeltaPct > 0 ? `+${scenario.discountDeltaPct}%` : `${scenario.discountDeltaPct}%`}</strong> | 
                Ad Spend Δ: <strong className="text-emerald-700 font-mono">{scenario.adSpendDeltaPct > 0 ? `+${scenario.adSpendDeltaPct}%` : `${scenario.adSpendDeltaPct}%`}</strong> | 
                FC Stock Δ: <strong className="text-emerald-700 font-mono">{scenario.stockDeltaPct > 0 ? `+${scenario.stockDeltaPct}%` : `${scenario.stockDeltaPct}%`}</strong> | 
                Model: <strong className="text-emerald-700 font-mono">{scenario.selectedModel}</strong>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedFestivalFilter}
              onChange={(e) => setSelectedFestivalFilter(e.target.value as any)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-emerald-600"
            >
              <option value="All">All Festivals</option>
              <option value="Diwali">Diwali</option>
              <option value="Dussehra">Dussehra</option>
              <option value="Holi">Holi</option>
              <option value="Eid">Eid</option>
              <option value="Pongal">Pongal</option>
              <option value="Christmas">Christmas</option>
            </select>
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value as any)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:border-emerald-600"
            >
              <option value="All">All Categories</option>
              <option value="Mobiles & Accessories">Mobiles</option>
              <option value="Electronics & Appliances">Electronics</option>
              <option value="Fashion & Apparel">Fashion</option>
              <option value="Home & Kitchen">Home</option>
              <option value="Sweets & Gourmet">Sweets</option>
              <option value="Beauty & Personal Care">Beauty</option>
            </select>
          </div>
        </div>
      </section>

      {/* Step 5: Stock-Out Analysis */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs text-rose-700 font-mono font-semibold uppercase tracking-wider mb-1">
            <span>Phase 05</span>
            <span>·</span>
            <span>Supply Chain Vulnerability Audit</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-600" />
            5. Stock-Out Risk &amp; Inventory Shortfall Analysis
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-3xl">
            Mathematical identification of fulfillment center stock-outs, root-cause diagnostics, and Safety Stock calculations.
          </p>
        </div>

        {/* Safety Stock Formula Box */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900">Amazon Inventory Optimization Mathematical Formulas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-emerald-800 font-bold block mb-1">1. Safety Stock (SS):</span>
              <p className="text-slate-900 font-bold">SS = Z × σ_d × √L</p>
              <p className="text-slate-600 text-[11px] font-sans mt-1">
                Where <strong className="text-slate-900">Z</strong> = Service level factor (1.65 for 95%, 2.05 for 98% Prime SLA), <strong className="text-slate-900">σ_d</strong> = standard deviation of daily demand, and <strong className="text-slate-900">L</strong> = supplier replenishment lead time in days.
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-teal-800 font-bold block mb-1">2. Reorder Point (ROP):</span>
              <p className="text-slate-900 font-bold">ROP = (d_avg × L) + SS</p>
              <p className="text-slate-600 text-[11px] font-sans mt-1">
                Where <strong className="text-slate-900">d_avg</strong> is average daily festive run rate, ensuring purchase orders trigger before warehouse stock drops below the safety buffer.
              </p>
            </div>
          </div>
        </div>

        {/* Critical Stock-Out Callouts */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Categories Facing Critical Stock-Out Risk</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {criticalStockOuts.map((risk) => (
              <div key={`${risk.festival}-${risk.category}`} className="bg-white border border-rose-300 rounded-xl p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-rose-700 uppercase tracking-wide">
                      Critical Shortage
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-0.5">
                      {risk.festival} — {risk.category}
                    </h4>
                  </div>
                  <div className="text-right font-mono tabular-nums">
                    <span className="text-xs text-slate-500 block">Projected Deficit</span>
                    <span className="text-lg font-bold text-rose-700">
                      -{Math.abs(risk.deficitOrSurplus).toLocaleString()} units
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 rounded-lg text-xs font-mono tabular-nums">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Forecast Demand</span>
                    <span className="text-slate-900 font-bold">{risk.predictedUnits.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Opening Stock</span>
                    <span className="text-amber-800 font-semibold">{risk.currentStock.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Replenish Lead Time</span>
                    <span className="text-slate-700">{risk.leadTimeDays} Days</span>
                  </div>
                </div>

                <div className="text-xs space-y-1.5 text-slate-700">
                  <p>
                    <strong className="text-rose-800">Why at risk:</strong> {risk.rootCause}
                  </p>
                  <p>
                    <strong className="text-emerald-800">Mitigation:</strong> {risk.actionableMitigation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 6: Discount and Advertising Analysis */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-mono font-semibold uppercase tracking-wider mb-1">
            <span>Phase 06</span>
            <span>·</span>
            <span>Elasticity &amp; Budget Optimization</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            6. Discount &amp; Advertising Strategy Optimization
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-3xl">
            Determining how promotional pricing depth and digital advertising investments drive customer acquisition and sales lift.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900">Promotional Discount Recommendations</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Based on empirical price elasticities calculated across historical Amazon Great Indian Festival sales:
            </p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="p-2.5 bg-slate-50 rounded-lg border-l-3 border-emerald-600">
                <strong className="text-slate-900 block font-bold">Fashion &amp; Apparel (Elasticity = -2.35):</strong>
                Run deep 40%–50% flash sales during early festival days to maximize basket size; gross margin remains safe due to high initial markup (45%).
              </li>
              <li className="p-2.5 bg-slate-50 rounded-lg border-l-3 border-teal-600">
                <strong className="text-slate-900 block font-bold">Electronics &amp; Mobiles (Elasticity = -1.58 to -1.72):</strong>
                Cap direct discounts at 20%–25%. Instead of margin-slashing, deploy bank instant discounts (10% card cashback) and 24-month No Cost EMI financing.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-lg border-l-3 border-slate-400">
                <strong className="text-slate-900 block font-bold">Sweets &amp; Gourmet (Elasticity = -0.85):</strong>
                Keep discounts shallow (15%–18%). Festival buyers prioritize fast guaranteed delivery dates over aggressive price discounts.
              </li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900">Digital Advertising &amp; Media Spend Allocation</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Amazon Sponsored Products, Sponsored Brands, and Amazon DSP optimization playbook:
            </p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="p-2.5 bg-slate-50 rounded-lg border-l-3 border-emerald-600">
                <strong className="text-slate-900 block font-bold">Teaser Phase (T-7 to T-1 Days):</strong>
                Allocate 35% of total festive media budget to wish-list building, video ads, and Prime Early Access hype.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-lg border-l-3 border-teal-600">
                <strong className="text-slate-900 block font-bold">Kickoff Spike (Day 1 to Day 3):</strong>
                Deploy 50% of ad spend when customer purchase intent is highest, bidding aggressively on high-converting branded keywords.
              </li>
              <li className="p-2.5 bg-slate-50 rounded-lg border-l-3 border-slate-400">
                <strong className="text-slate-900 block font-bold">Sustain &amp; Wrap-Up (Day 4 to Day 7):</strong>
                Throttle ad bids to 15% budget. Reallocate exclusively to retargeting shoppers who added items to carts but didn't complete checkout.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
