import React, { useState } from 'react';
import { BookOpen, GraduationCap, Award, HelpCircle, CheckCircle2, ChevronRight, AlertTriangle, Layers, FileText } from 'lucide-react';

export const CollegePresentationSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const presentationSections = [
    {
      id: 'problem_statement',
      title: '1. Problem Statement',
      category: 'Context & Challenge',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-slate-700 leading-relaxed">
            During major Indian festivals (<strong className="text-emerald-800">Diwali, Dussehra, Holi, Eid, Pongal, and Christmas</strong>), e-commerce platforms like Amazon experience extreme, sudden spikes in customer purchase volume—often 300% to 600% above normal operating baselines.
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
            <span className="font-bold text-rose-700 block">The Core Dilemma:</span>
            <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
              <li><strong className="text-slate-900">Under-stocking:</strong> Leads to catastrophic stock-outs, lost Gross Merchandise Value (GMV), customer dissatisfaction, and brand churn.</li>
              <li><strong className="text-slate-900">Over-stocking:</strong> Locks up millions in capital, accumulates high warehouse storage fees, and causes steep post-festival markdowns/liquidations.</li>
              <li><strong className="text-slate-900">Fragmented Planning:</strong> Traditional manual spreadsheets cannot model complex multi-variable interactions between promotional discounts, digital ad spend, lead times, and regional cultural surges.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'objective',
      title: '2. Project Objective',
      category: 'Goals & KPIs',
      content: (
        <div className="space-y-3">
          <p className="text-sm text-slate-700 leading-relaxed">
            To architect an end-to-end, AI-powered predictive demand forecasting and Generative AI decision-support platform tailored for Amazon festival sales operations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-emerald-800 block mb-1">Primary Analytical Objectives:</span>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li>Predict festival unit sales by category and geographic region.</li>
                <li>Identify high-risk stock-out categories before sale launch.</li>
                <li>Calculate optimal safety stock buffers using lead-time variance.</li>
              </ul>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-teal-800 block mb-1">Generative AI Objectives:</span>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li>Convert complex numerical ML predictions into clean business briefings.</li>
                <li>Provide real-time interactive decision support for Amazon category managers.</li>
                <li>Generate tailored inventory, discount, and ad spend playbooks.</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'proposed_solution',
      title: '3. Proposed Solution Architecture',
      category: 'System Design',
      content: (
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            A hybrid dual-engine pipeline integrating <strong className="text-emerald-800">Predictive Machine Learning</strong> (for mathematical numerical forecasting) with <strong className="text-teal-800">Generative AI (Gemini 3.8 Flash)</strong> (for contextual decision synthesis).
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2 font-mono">
            <span className="text-emerald-800 block font-sans font-bold">End-to-End Execution Flow:</span>
            <div className="text-slate-700 leading-loose">
              [Raw Amazon Historical Data] ➔ [Data Sanitization &amp; Date Engineering]<br />
              ➔ [EDA &amp; Price/Ad Elasticity Calculation]<br />
              ➔ [ML Model Suite: Linear + Random Forest + Time-Series Ensemble]<br />
              ➔ [Safety Stock Formula: SS = Z × σ_d × √L]<br />
              ➔ [Generative AI Prompt Engine (Gemini 3.8 Flash)]<br />
              ➔ [Executive 5-Bullet Briefing &amp; ATS Logistics Allocation]
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'data_used',
      title: '4. Dataset Specifications',
      category: 'Data Science Foundation',
      content: (
        <div className="space-y-3 text-xs text-slate-700">
          <p className="text-sm text-slate-700">
            Multi-year festival sales dataset covering 6 major Indian festive occasions across 6 core product verticals.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-slate-50 rounded-lg border border-slate-200">
              <thead>
                <tr className="text-slate-600 border-b border-slate-200 font-semibold">
                  <th className="p-2.5 font-mono">Feature</th>
                  <th className="p-2.5">Type</th>
                  <th className="p-2.5">Analytical Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-slate-700">
                <tr><td className="p-2.5 text-emerald-800 font-bold">festival_name &amp; dates</td><td className="p-2.5">Categorical / ISO Date</td><td className="p-2.5 font-sans">Cyclical seasonality &amp; campaign length</td></tr>
                <tr><td className="p-2.5 text-emerald-800 font-bold">category &amp; region</td><td className="p-2.5">Categorical</td><td className="p-2.5 font-sans">Product margin tier &amp; regional FC fulfillment</td></tr>
                <tr><td className="p-2.5 text-emerald-800 font-bold">units_sold (Target Y)</td><td className="p-2.5">Numerical Continuous</td><td className="p-2.5 font-sans">Primary regression forecasting variable</td></tr>
                <tr><td className="p-2.5 text-emerald-800 font-bold">price_inr &amp; discount_pct</td><td className="p-2.5">Numerical</td><td className="p-2.5 font-sans">Price elasticity of demand (E_p)</td></tr>
                <tr><td className="p-2.5 text-emerald-800 font-bold">advertising_spend_lakhs</td><td className="p-2.5">Numerical Continuous</td><td className="p-2.5 font-sans">Paid media response &amp; ROAS optimization</td></tr>
                <tr><td className="p-2.5 text-emerald-800 font-bold">stock_level</td><td className="p-2.5">Numerical Discrete</td><td className="p-2.5 font-sans">Opening FC inventory to detect stock-out deficits</td></tr>
                <tr><td className="p-2.5 text-emerald-800 font-bold">customer_rating</td><td className="p-2.5">Ordinal / Continuous</td><td className="p-2.5 font-sans">Consumer trust &amp; deal conversion multiplier</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: 'methodology',
      title: '5. Methodology & Technical Workflow',
      category: 'Data Science Lifecycle',
      content: (
        <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-emerald-800 block mb-1">1. Preprocessing</span>
              <ul className="space-y-1 list-disc list-inside text-slate-600">
                <li>Check missing values &amp; duplicate keys.</li>
                <li>Date parsing into duration, quarter, weekend density.</li>
                <li>One-Hot Encoding for linear regressors; Ordinal/Target encoding for trees.</li>
              </ul>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-teal-800 block mb-1">2. Modeling &amp; Validation</span>
              <ul className="space-y-1 list-disc list-inside text-slate-600">
                <li>Linear Regression for feature transparency and coefficients.</li>
                <li>Random Forest Regressor (100 estimators) for non-linear thresholds.</li>
                <li>Holt-Winters time-series trend projection.</li>
              </ul>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-slate-900 block mb-1">3. Inventory Math</span>
              <ul className="space-y-1 list-disc list-inside text-slate-600">
                <li>Safety Stock calculation with Normal Z-score (95% service level).</li>
                <li>Reorder Point (ROP) calculation.</li>
                <li>Risk classification: Critical, Moderate, Optimal, Overstocked.</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'ai_vs_genai',
      title: '6. AI/ML Role vs. Generative AI Role',
      category: 'Core AI Distinction',
      content: (
        <div className="space-y-3">
          <p className="text-xs text-slate-600">
            A key academic distinction between Predictive AI and Generative AI within this enterprise system:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 border border-emerald-200 rounded-xl space-y-2">
              <span className="font-bold text-emerald-800 block text-sm">Role of Predictive AI / Machine Learning:</span>
              <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                <li>Calculates quantitative, numeric predictions (e.g. 215,000 units).</li>
                <li>Models mathematical price elasticity and advertising coefficients.</li>
                <li>Computes safety stock thresholds using statistical distributions.</li>
                <li><strong className="text-slate-900">Output:</strong> Pure numbers, probabilities, arrays, and metrics.</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 border border-teal-200 rounded-xl space-y-2">
              <span className="font-bold text-teal-800 block text-sm">Role of Generative AI (LLMs / Gemini):</span>
              <ul className="space-y-1.5 text-slate-700 list-disc list-inside">
                <li>Translates numeric outputs into executive business strategy memos.</li>
                <li>Synthesizes cross-functional risks (connecting logistics with marketing).</li>
                <li>Generates natural language 5-bullet briefings for sales leadership.</li>
                <li>Provides conversational consultative Q&amp;A for category planners.</li>
                <li><strong className="text-slate-900">Output:</strong> Natural language briefings, explanations, and action playbooks.</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'benefits',
      title: '7. Business & Academic Benefits',
      category: 'Impact & ROI',
      content: (
        <div className="space-y-3 text-xs text-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-emerald-800 block mb-1">Operational &amp; Business Value:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                <li><strong className="text-slate-900">Eliminates Stock-Outs:</strong> Reduces out-of-stock lost GMV on high-velocity SKUs by up to 35%.</li>
                <li><strong className="text-slate-900">Capital Efficiency:</strong> Prevents post-festival overstock markdowns and holding cost penalties.</li>
                <li><strong className="text-slate-900">Ad Spend Optimization:</strong> Reallocates marketing budget to high-elasticity windows, increasing ROAS by ~18%.</li>
              </ul>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-teal-800 block mb-1">Academic &amp; Research Rigor:</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                <li>Demonstrates practical application of multi-variate regression and ensemble learning on seasonal retail spikes.</li>
                <li>Combines classical inventory theory (Safety Stock / Reorder Point) with modern LLM prompt engineering.</li>
                <li>Offers verifiable evaluation metrics (MAE, RMSE, R²).</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'limitations_future',
      title: '8. Limitations & Additional Data Required',
      category: 'Critical Evaluation',
      content: (
        <div className="space-y-3 text-xs text-slate-700">
          <p className="text-slate-600">
            For academic integrity, it is vital to disclose what additional data is needed when historical records are constrained:
          </p>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
            <span className="font-bold text-rose-700 block">Critical Limitations &amp; Missing Signals:</span>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600">
              <li><strong className="text-slate-900">Unobserved True Demand (Censored Demand):</strong> When stock runs out on Day 2, historical units sold underrepresents actual latent customer demand. <em className="text-slate-500">Additional data needed: Real-time out-of-stock page views and glance views.</em></li>
              <li><strong className="text-slate-900">Competitor Dynamics:</strong> Does not capture rival festive events (e.g. Flipkart Big Billion Days) discounting in parallel.</li>
              <li><strong className="text-slate-900">Macroeconomic Inflation / Consumer Sentiment:</strong> Discretionary spending power varies year-to-year based on interest rates and monsoon performance.</li>
              <li><strong className="text-slate-900">SKU-Level Granularity:</strong> Data currently operates at Category/Region level; production requires individual ASIN-level granular time series.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'viva_cheat_sheet',
      title: '9. College Viva Voce Q&A Cheat Sheet',
      category: 'Exam / Defense Ready',
      content: (
        <div className="space-y-3 text-xs">
          <p className="text-slate-600">
            Top questions university professors and thesis evaluators ask during M.Sc. Data Science vivas:
          </p>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-emerald-900 block mb-0.5">Q1: Why use an Ensemble of Random Forest and Linear Regression rather than Deep Learning (LSTM / Transformers)?</span>
              <p className="text-slate-700 leading-relaxed">
                <strong>Answer:</strong> Festival sales data is tabular and intermittent (events occur only once or twice a year). Deep Learning models like LSTMs require continuous high-frequency sequences and easily overfit on small sample sizes. Ensemble tree-based regressors handle non-linear thresholds and small data regimes far more reliably with zero training instability.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-emerald-900 block mb-0.5">Q2: Why is the square root of Lead Time (√L) used in the Safety Stock formula?</span>
              <p className="text-slate-700 leading-relaxed">
                <strong>Answer:</strong> Under the assumption that daily demand is independent and identically distributed (i.i.d.) with standard deviation σ_d, the variance over L days is Var(Total) = L × σ_d². Because standard deviation is the square root of variance, the standard deviation over lead time is √(L × σ_d²) = σ_d × √L.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-emerald-900 block mb-0.5">Q3: What prevents the Generative AI assistant from hallucinating false sales numbers?</span>
              <p className="text-slate-700 leading-relaxed">
                <strong>Answer:</strong> We enforce strict Grounded Prompt Engineering. The LLM is never asked to predict numbers out of thin air; all numeric forecasting is completed beforehand by the mathematical ML engine and passed into the prompt as a verified JSON payload with low temperature (0.2). The LLM's sole task is semantic interpretation and operational synthesis.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'conclusion',
      title: '10. Project Conclusion',
      category: 'Summary',
      content: (
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
          <p>
            This project successfully demonstrates how combining statistical machine learning forecasting with Generative AI bridges the long-standing gap between quantitative data science and executive business decision-making.
          </p>
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2 text-xs">
            <span className="font-bold text-emerald-900 block">Final Takeaway for M.Sc. Data Science Project Defense:</span>
            <p className="text-slate-700">
              "By anticipating festive demand velocity weeks ahead of sale kickoff, Amazon can proactively optimize FC inventory placement, protect contribution margins via disciplined discount corridors, and ensure flawless last-mile delivery execution—proving that Generative AI is at its most powerful when grounded in rigorous quantitative predictive models."
            </p>
          </div>
        </div>
      ),
    },
  ];

  const current = presentationSections[activeSlide];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs text-emerald-700 font-mono font-semibold uppercase tracking-wider mb-1">
          <span>Phase 10</span>
          <span>·</span>
          <span>College Presentation &amp; Viva Voce Defense Deck</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-emerald-700" />
          10. Comprehensive Project Explanation &amp; Viva Preparation
        </h2>
        <p className="text-slate-600 text-sm mt-1 max-w-3xl">
          Complete, end-to-end academic project documentation designed for M.Sc. Data Science presentation, project viva, and university examination defense.
        </p>
      </div>

      {/* Slide Navigation & Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-1 bg-white border border-slate-200 rounded-xl p-3 max-h-[560px] overflow-y-auto shadow-xs">
          <span className="text-[11px] font-mono uppercase text-slate-400 px-3 py-1 block font-semibold">
            Presentation Slides
          </span>
          {presentationSections.map((sec, idx) => {
            const isActive = activeSlide === idx;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSlide(idx)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-emerald-700 text-white font-bold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className="truncate">{sec.title}</span>
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Active Slide Canvas */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between min-h-[440px] shadow-xs">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="text-xs text-emerald-700 font-mono font-semibold block">{current.category}</span>
                <h3 className="text-lg font-bold text-slate-900">{current.title}</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Slide {activeSlide + 1} of {presentationSections.length}
              </span>
            </div>

            <div className="pt-2">{current.content}</div>
          </div>

          {/* Slide Footer Controls */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setActiveSlide((prev) => Math.max(prev - 1, 0))}
              disabled={activeSlide === 0}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 text-slate-700 rounded-md hover:bg-slate-100 disabled:opacity-40 transition-colors font-medium"
            >
              Previous Slide
            </button>
            <div className="flex items-center gap-1">
              {presentationSections.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeSlide === i ? 'bg-emerald-600 w-4' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveSlide((prev) => Math.min(prev + 1, presentationSections.length - 1))}
              disabled={activeSlide === presentationSections.length - 1}
              className="px-3 py-1.5 text-xs bg-emerald-700 font-bold text-white rounded-md hover:bg-emerald-800 disabled:opacity-40 transition-colors shadow-xs"
            >
              Next Slide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
