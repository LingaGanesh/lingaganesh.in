import React from 'react';
import { ScenarioParams, FestivalName } from '../types/dataset';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface ScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: ScenarioParams;
  onUpdateScenario: (newScenario: Partial<ScenarioParams>) => void;
  onResetScenario: () => void;
}

export const ScenarioModal: React.FC<ScenarioModalProps> = ({
  isOpen,
  onClose,
  scenario,
  onUpdateScenario,
  onResetScenario,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">Festive Scenario Simulator</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-600">
          Adjust commercial and operational levers to simulate real-time impacts on predicted demand, revenue, and FC stock-out exposure.
        </p>

        <div className="space-y-4 text-xs">
          {/* Discount Delta */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium">
              <label className="text-slate-800">Promotional Discount Adjustment (Δ %):</label>
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
            <span className="text-[11px] text-slate-500 block">
              Higher discounts stimulate unit sales based on category price elasticity.
            </span>
          </div>

          {/* Ad Spend Delta */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium">
              <label className="text-slate-800">Advertising Media Spend Adjustment (Δ %):</label>
              <span className="font-mono font-bold text-teal-700">
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
              className="w-full accent-teal-600 cursor-pointer"
            />
            <span className="text-[11px] text-slate-500 block">
              Alters Sponsored Products &amp; DSP bid aggression across consumer segments.
            </span>
          </div>

          {/* Opening Stock Delta */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium">
              <label className="text-slate-800">Warehouse Opening Stock Buffer (Δ %):</label>
              <span className="font-mono font-bold text-emerald-800">
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
            <span className="text-[11px] text-slate-500 block">
              Simulates seller inbound fulfillment delays or aggressive pre-stocking.
            </span>
          </div>

          {/* Model Selector */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <label className="text-slate-800 font-bold block">Machine Learning Forecasting Model:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'ensemble', label: 'Ensemble (Production)' },
                { id: 'random_forest', label: 'Random Forest' },
                { id: 'linear_regression', label: 'Linear Regression' },
                { id: 'time_series', label: 'Holt-Winters Trend' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => onUpdateScenario({ selectedModel: m.id as any })}
                  className={`p-2 rounded-lg text-left transition-colors text-xs font-medium ${
                    scenario.selectedModel === m.id
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold'
                      : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <button
            onClick={onResetScenario}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Baseline</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg transition-colors shadow-xs"
          >
            Apply Scenario
          </button>
        </div>
      </div>
    </div>
  );
};
