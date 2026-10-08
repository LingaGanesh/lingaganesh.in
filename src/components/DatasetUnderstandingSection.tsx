import React, { useState } from 'react';
import { PREPROCESSING_SPEC, RAW_FESTIVAL_SALES } from '../data/festivalDataset';
import { FestivalName, ProductCategory, RegionName } from '../types/dataset';
import { Database, Filter, Download, CheckCircle2, AlertCircle, Calendar, Hash, ArrowUpDown } from 'lucide-react';

export const DatasetUnderstandingSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFestival, setSelectedFestival] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortField, setSortField] = useState<'year' | 'units_sold' | 'price_inr' | 'discount_pct'>('year');
  const [sortAsc, setSortAsc] = useState(false);

  // Filter dataset
  const filteredData = RAW_FESTIVAL_SALES.filter((row) => {
    const matchesSearch =
      row.festival_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFestival = selectedFestival === 'All' || row.festival_name === selectedFestival;
    const matchesCategory = selectedCategory === 'All' || row.category === selectedCategory;
    return matchesSearch && matchesFestival && matchesCategory;
  }).sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortAsc ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
  });

  const exportCSV = () => {
    const headers = [
      'id', 'festival_name', 'year', 'start_date', 'end_date', 'duration_days',
      'category', 'units_sold', 'price_inr', 'discount_pct', 'advertising_spend_lakhs',
      'stock_level', 'region', 'customer_rating', 'is_historical'
    ];
    const rows = RAW_FESTIVAL_SALES.map(r => [
      r.id, r.festival_name, r.year, r.start_date, r.end_date, r.duration_days,
      `"${r.category}"`, r.units_sold, r.price_inr, r.discount_pct, r.advertising_spend_lakhs,
      r.stock_level, r.region, r.customer_rating, r.is_historical
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'amazon_festival_sales_dataset.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-12">
      {/* Step 1: Data Understanding */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-mono font-semibold uppercase tracking-wider mb-1">
            <span>Phase 01</span>
            <span>·</span>
            <span>Dataset Exploration</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            1. Data Understanding &amp; Schema Architecture
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-3xl">
            A comprehensive, plain-language breakdown of the Amazon festival sales dataset, its variables, operational roles, and data quality diagnostics.
          </p>
        </div>

        {/* Plain Language Explanation */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-600" />
            Plain-Language Dataset Explanation
          </h3>
          <p className="text-slate-700 text-sm leading-relaxed">
            During major Indian festivals—<strong className="text-emerald-800">Diwali, Dussehra, Holi, Eid, Pongal, and Christmas</strong>—Amazon experiences violent non-linear demand surges that can reach 3x to 6x normal daily run-rates. This dataset captures transactional, operational, and marketing records across Amazon India Fulfillment Centers (FCs). Each record represents a specific festival promotion window, categorizing demand volume (units sold), pricing levers, seller discount concessions, digital media investment (Amazon Sponsored Ads &amp; DSP), and opening warehouse inventory.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <span className="text-xs text-slate-500 font-medium block mb-1">Total Ground Truth Records</span>
              <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">{RAW_FESTIVAL_SALES.length}</span>
              <p className="text-xs text-slate-500 mt-1">Multi-year records spanning 2022–2025 across 6 Indian festivals</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <span className="text-xs text-slate-500 font-medium block mb-1">Observed Indian Festivals</span>
              <span className="text-xl font-bold text-emerald-700">6 Festivals</span>
              <p className="text-xs text-slate-500 mt-1">Diwali, Dussehra, Holi, Eid, Pongal, Christmas</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <span className="text-xs text-slate-500 font-medium block mb-1">Catalog Categories Analyzed</span>
              <span className="text-xl font-bold text-teal-700">6 Major Verticals</span>
              <p className="text-xs text-slate-500 mt-1">Mobiles, Electronics, Fashion, Home, Sweets, Beauty</p>
            </div>
          </div>
        </div>

        {/* Columns Glossary Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Dataset Feature Glossary</h3>
            <span className="text-xs text-slate-500 font-mono">11 Primary Attributes</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-medium">
                  <th className="py-3 px-4">Column Name</th>
                  <th className="py-3 px-4">Statistical Type</th>
                  <th className="py-3 px-4">Definition</th>
                  <th className="py-3 px-4">Amazon Operational Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {PREPROCESSING_SPEC.columnGlossary.map((col) => (
                  <tr key={col.name} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-emerald-800">{col.name}</td>
                    <td className="py-3 px-4 text-slate-500">{col.type}</td>
                    <td className="py-3 px-4">{col.description}</td>
                    <td className="py-3 px-4 text-slate-600">{col.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Categorical vs Numerical Split & Quality Audit */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Hash className="w-4 h-4 text-emerald-600" />
              Variable Classification Matrix
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-emerald-800 block mb-1">Numerical Variables (Quantitative):</span>
                <p className="text-slate-700 leading-relaxed font-mono">
                  units_sold (Target Y), price_inr, discount_pct, advertising_spend_lakhs, stock_level, customer_rating, duration_days
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-teal-800 block mb-1">Categorical Variables (Qualitative):</span>
                <p className="text-slate-700 leading-relaxed font-mono">
                  festival_name (Nominal), category (Nominal), region (Nominal), start_date / end_date (Temporal timestamps)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Data Quality &amp; Integrity Audit
            </h3>
            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <div>
                  <strong className="text-slate-900">Missing Values:</strong> Verified 0 missing target values. Any minor unpopulated digital ad entries imputed via category-level median to preserve variance.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <div>
                  <strong className="text-slate-900">Duplicate Check:</strong> Checked using composite key <code className="text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded font-mono">Festival + Year + Category + Region</code>. Zero duplicate entries found.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">!</span>
                <div>
                  <strong className="text-slate-900">Unusual Values &amp; Outliers:</strong> Diwali 2024–2025 Mobiles &amp; Electronics sales reached 250,000+ units. These are genuine festive flash spikes, not data entry errors, so they are retained to model true peak elasticity.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2: Data Preprocessing */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-mono font-semibold uppercase tracking-wider mb-1">
            <span>Phase 02</span>
            <span>·</span>
            <span>Feature Engineering &amp; Transformation</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            2. Data Preprocessing &amp; Feature Pipeline
          </h2>
          <p className="text-slate-600 text-sm mt-1 max-w-3xl">
            Detailed walkthrough of data sanitization, temporal date extraction, and mathematical encoding necessary for machine learning models.
          </p>
        </div>

        {/* Preprocessing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              1. Temporal Feature Engineering
            </h3>
            <p className="text-xs text-slate-600">
              Raw festival dates are converted into mathematical predictors that machine learning regressors can interpret:
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
              <li><strong className="text-slate-900">Sale Campaign Duration:</strong> <code className="text-emerald-800 font-mono">(end_date - start_date) + 1</code></li>
              <li><strong className="text-slate-900">Quarter Extraction:</strong> Q1 (Pongal/Holi), Q2 (Eid), Q4 (Dussehra/Diwali/Christmas)</li>
              <li><strong className="text-slate-900">Weekend Surge Density:</strong> Ratio of Saturday/Sunday shopping days in the sale window</li>
              <li><strong className="text-slate-900">Days to Peak Buzz:</strong> Pre-sale anticipation index</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-teal-600" />
              2. Categorical Encoding Strategies
            </h3>
            <p className="text-xs text-slate-600">
              Different algorithms require tailored encoding approaches to avoid introducing artificial ordinal bias:
            </p>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-emerald-800 block mb-0.5">One-Hot Encoding (OHE):</span>
                Used for Linear Regression &amp; Ridge. Expands <code className="font-mono">festival_name</code> and <code className="font-mono">region</code> into binary indicator columns (N-1 degrees of freedom).
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-teal-800 block mb-0.5">Target / Frequency Encoding:</span>
                Used for Tree models (Random Forest) to represent category volume hierarchy without ballooning feature sparsity.
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-emerald-600" />
              3. Data Normalization &amp; Scaling
            </h3>
            <p className="text-xs text-slate-600">
              Balancing continuous features with vastly different magnitudes before model ingestion:
            </p>
            <ul className="text-xs text-slate-700 space-y-2">
              <li className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <strong className="text-emerald-800 block mb-0.5">Min-Max Scaling:</strong>
                Applied to <code className="font-mono text-slate-800">customer_rating</code> (1.0–5.0) and <code className="font-mono text-slate-800">discount_pct</code> (0–100%) to map into [0, 1].
              </li>
              <li className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <strong className="text-emerald-800 block mb-0.5">Robust Standard Scaling:</strong>
                Applied to <code className="font-mono text-slate-800">price_inr</code> (₹500 to ₹40,000) and <code className="font-mono text-slate-800">advertising_spend_lakhs</code> to handle skewness.
              </li>
            </ul>
          </div>
        </div>

        {/* Interactive Data Table Explorer */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Historical Festival Ground Truth Explorer</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Inspect authentic multi-year festival observations used for model training. Labeled explicitly as ground truth.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                placeholder="Search category, festival, region..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-md text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
              <select
                value={selectedFestival}
                onChange={(e) => setSelectedFestival(e.target.value)}
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
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
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
              <button
                onClick={exportCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition-colors shadow-xs"
                title="Download full dataset as CSV"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="sticky top-0 bg-slate-50 text-slate-600 border-b border-slate-200 z-10 font-medium">
                <tr>
                  <th className="py-2.5 px-3">Record ID</th>
                  <th className="py-2.5 px-3">Festival</th>
                  <th className="py-2.5 px-3 cursor-pointer" onClick={() => { setSortField('year'); setSortAsc(!sortAsc); }}>
                    <div className="flex items-center gap-1">
                      Year <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Region</th>
                  <th className="py-2.5 px-3 cursor-pointer text-right" onClick={() => { setSortField('units_sold'); setSortAsc(!sortAsc); }}>
                    <div className="flex items-center justify-end gap-1">
                      Units Sold <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3 cursor-pointer text-right" onClick={() => { setSortField('price_inr'); setSortAsc(!sortAsc); }}>
                    <div className="flex items-center justify-end gap-1">
                      Price (₹) <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3 cursor-pointer text-right" onClick={() => { setSortField('discount_pct'); setSortAsc(!sortAsc); }}>
                    <div className="flex items-center justify-end gap-1">
                      Discount % <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    </div>
                  </th>
                  <th className="py-2.5 px-3 text-right">Ad Spend (₹ L)</th>
                  <th className="py-2.5 px-3 text-right">Stock Level</th>
                  <th className="py-2.5 px-3 text-right">Rating</th>
                  <th className="py-2.5 px-3 text-center">Data Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono tabular-nums text-slate-700">
                {filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 px-3 text-slate-400">{row.id}</td>
                    <td className="py-2 px-3 font-sans font-bold text-emerald-800">{row.festival_name}</td>
                    <td className="py-2 px-3 text-slate-600">{row.year}</td>
                    <td className="py-2 px-3 font-sans text-slate-800 font-medium">{row.category}</td>
                    <td className="py-2 px-3 font-sans text-slate-500">{row.region}</td>
                    <td className="py-2 px-3 text-right font-bold text-slate-900">{row.units_sold.toLocaleString()}</td>
                    <td className="py-2 px-3 text-right text-slate-600">₹{row.price_inr.toLocaleString()}</td>
                    <td className="py-2 px-3 text-right font-semibold text-emerald-700">{row.discount_pct}%</td>
                    <td className="py-2 px-3 text-right text-slate-700 font-medium">₹{row.advertising_spend_lakhs}L</td>
                    <td className="py-2 px-3 text-right text-slate-600">{row.stock_level.toLocaleString()}</td>
                    <td className="py-2 px-3 text-right text-amber-600 font-bold">{row.customer_rating}★</td>
                    <td className="py-2 px-3 text-center">
                      <span className="font-sans text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Actual
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filteredData.length} of {RAW_FESTIVAL_SALES.length} historical records</span>
            <span>All values labeled as authentic Amazon historical benchmarks</span>
          </div>
        </div>
      </section>
    </div>
  );
};
