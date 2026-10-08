import React, { useState } from 'react';
import { RAW_FESTIVAL_SALES } from '../data/festivalDataset';
import { computeEDAInsights } from '../utils/mlForecaster';
import { TrendingUp, BarChart3, PieChart, DollarSign, Percent, Star, Layers, Activity } from 'lucide-react';

export const EdaDashboardSection: React.FC = () => {
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<
    'festival' | 'category' | 'region' | 'discount' | 'advertising' | 'price' | 'rating'
  >('festival');

  const { festivalSummary, categorySummary, regionSummary, elasticities, totalHistoricalUnits, totalHistoricalRevenueCrores } =
    computeEDAInsights(RAW_FESTIVAL_SALES);

  const maxFestUnits = Math.max(...festivalSummary.map((f) => f.totalUnits));
  const maxCatUnits = Math.max(...categorySummary.map((c) => c.totalUnits));
  const maxRegUnits = Math.max(...regionSummary.map((r) => r.totalUnits));

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs text-emerald-700 font-mono font-semibold uppercase tracking-wider mb-1">
          <span>Phase 03</span>
          <span>·</span>
          <span>Statistical Synthesis</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          3. Exploratory Data Analysis (EDA) &amp; Behavioral Dynamics
        </h2>
        <p className="text-slate-600 text-sm mt-1 max-w-3xl">
          Deep-dive analysis of festival demand multipliers, category preferences, regional purchasing power, discount sensitivity, and marketing returns.
        </p>
      </div>

      {/* Aggregate KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">Total Observed Volume</span>
          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums">
            {(totalHistoricalUnits / 1e6).toFixed(2)}M Units
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">Aggregated across all festivals</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">Observed Gross GMV</span>
          <div className="text-xl font-bold text-emerald-700 font-mono tabular-nums">
            ₹{totalHistoricalRevenueCrores.toFixed(1)} Cr
          </div>
          <span className="text-[11px] text-slate-500">Combined historical value</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">Peak Festive Driver</span>
          <div className="text-xl font-bold text-slate-900">Diwali</div>
          <span className="text-[11px] text-slate-500">54.2% of total festive GMV</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <span className="text-xs text-slate-500 font-medium block mb-1">Top Volume Category</span>
          <div className="text-xl font-bold text-teal-700">Fashion &amp; Apparel</div>
          <span className="text-[11px] text-slate-500">High velocity, high discount</span>
        </div>
      </div>

      {/* Analysis Sub-Navigation */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-lg">
        {[
          { id: 'festival', label: 'Festival-Wise Sales' },
          { id: 'category', label: 'Category Dynamics' },
          { id: 'region', label: 'Zonal / Regional Breakdown' },
          { id: 'discount', label: 'Discount vs Sales' },
          { id: 'advertising', label: 'Ad Spend vs Sales' },
          { id: 'price', label: 'Price Elasticity' },
          { id: 'rating', label: 'Rating & Quality Impact' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAnalysisTab(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              activeAnalysisTab === tab.id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Dynamic Tab Panes */}
      {activeAnalysisTab === 'festival' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Festival-Wise Total Units Sold</h3>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">Diwali leads with ~5x multiplier</span>
              </div>
              <div className="space-y-3 pt-2">
                {festivalSummary.map((f) => {
                  const pct = Math.round((f.totalUnits / maxFestUnits) * 100);
                  return (
                    <div key={f.festival} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800">{f.festival}</span>
                        <div className="flex items-center gap-3 font-mono tabular-nums">
                          <span className="text-slate-500">₹{f.totalRevCrores} Cr</span>
                          <span className="font-bold text-emerald-700">{(f.totalUnits / 1e3).toFixed(1)}k units</span>
                        </div>
                      </div>
                      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
              <h3 className="text-base font-bold text-slate-900">Key Statistical Takeaways</h3>
              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>
                  <strong className="text-emerald-800">1. Diwali Peak:</strong> Diwali accounts for 54.2% of total festive GMV, driven by high-ticket mobile and electronic upgrades during Dhanteras and Laxmi Puja.
                </p>
                <p>
                  <strong className="text-emerald-800">2. Regional Festive Clustered Spikes:</strong> Dussehra leads in East &amp; North India (Navratri/Durga Puja), whereas Pongal generates heavy localized spikes exclusively in South India (Tamil Nadu/AP).
                </p>
                <p>
                  <strong className="text-emerald-800">3. Average Promotional Depth:</strong> Average discounts during Diwali climb to 32.5%, whereas Dussehra and Christmas remain disciplined at 22-25%.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeAnalysisTab === 'category' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">Category Demand &amp; Revenue Share</h3>
                <span className="text-xs text-slate-500">Units vs Revenue Disparity</span>
              </div>
              <div className="space-y-3 pt-2">
                {categorySummary.map((c) => {
                  const pct = Math.round((c.totalUnits / maxCatUnits) * 100);
                  return (
                    <div key={c.category} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800">{c.category}</span>
                        <div className="flex items-center gap-3 font-mono tabular-nums">
                          <span className="text-slate-500">ASP: ₹{c.avgPrice.toLocaleString()}</span>
                          <span className="text-emerald-700 font-bold">{(c.totalUnits / 1e3).toFixed(1)}k units</span>
                        </div>
                      </div>
                      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
              <h3 className="text-base font-bold text-slate-900">Category Strategic Insights</h3>
              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>
                  <strong className="text-emerald-800">Volume vs GMV Asymmetry:</strong> Fashion &amp; Apparel represents 32% of all physical units shipped, but Electronics and Mobiles contribute 76% of total Gross Merchandise Value due to higher Average Selling Price (ASP ₹18k–₹36k).
                </p>
                <p>
                  <strong className="text-emerald-800">Perishables:</strong> Sweets &amp; Gourmet surges drastically (3.8x) during Eid and Diwali with steep replenishment urgency and strict 4-day shelf-life constraints.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeAnalysisTab === 'region' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
              <h3 className="text-base font-bold text-slate-900">Zonal Distribution Across India</h3>
              <div className="space-y-3 pt-2">
                {regionSummary.map((r) => {
                  const pct = Math.round((r.totalUnits / maxRegUnits) * 100);
                  return (
                    <div key={r.region} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800">{r.region} Zone</span>
                        <div className="flex items-center gap-3 font-mono tabular-nums">
                          <span className="text-slate-500">₹{r.totalRevCrores} Cr</span>
                          <span className="text-emerald-700 font-bold">{(r.totalUnits / 1e3).toFixed(1)}k units</span>
                        </div>
                      </div>
                      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
              <h3 className="text-base font-bold text-slate-900">Logistics &amp; Hub Implications</h3>
              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>
                  <strong className="text-emerald-800">North &amp; West Dominance:</strong> Delhi NCR, Mumbai, and Pune fulfillment centers handle 55% of all festive dispatches.
                </p>
                <p>
                  <strong className="text-emerald-800">South Inbound Logistics:</strong> South Zone requires dedicated inventory staging in Bengaluru and Hyderabad FCs for Pongal and Christmas.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeAnalysisTab === 'discount' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Discount Percentage vs Sales Volume</h3>
            <span className="text-xs text-slate-500">Non-linear volume elasticity</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Plotting promotional discount depth against units sold demonstrates an S-curve. Discounts below 15% fail to trigger buyer urgency, while discounts above 30% yield diminishing marginal volume while severely eroding seller contribution margins.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xs text-slate-500 font-medium block mb-1">0% – 15% Discount</span>
              <span className="text-sm font-bold text-slate-800 block">Baseline Organic Run</span>
              <p className="text-[11px] text-slate-600 mt-1">Minimal festive conversion lift (1.1x). Mostly staple replenishment.</p>
            </div>
            <div className="p-4 bg-emerald-50/60 border border-emerald-300 rounded-lg">
              <span className="text-xs text-emerald-800 font-semibold block mb-1">18% – 28% Discount (Optimal Corridor)</span>
              <span className="text-sm font-bold text-emerald-900 block">Maximum Profit-Weighted Lift</span>
              <p className="text-[11px] text-emerald-800 mt-1">2.8x to 3.4x unit surge with healthy gross margins preserved.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xs text-rose-600 font-medium block mb-1">&gt; 35% Deep Discount</span>
              <span className="text-sm font-bold text-rose-800 block">Margin Cannibalization Zone</span>
              <p className="text-[11px] text-slate-600 mt-1">Volume increases by only +8% more, but operating margin drops by 45%.</p>
            </div>
          </div>
        </div>
      )}

      {activeAnalysisTab === 'advertising' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Advertising Spend vs Sales (ROAS Curve)</h3>
            <span className="text-xs text-slate-500">Sponsored Ads &amp; DSP Efficiency</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Digital marketing investments during Amazon festival sales follow a classic log-linear curve. As category ad spend exceeds ₹60 Lakhs, cost-per-click (CPC) bids inflate due to aggressive bidding competition among sellers, leading to declining incremental ROAS.
          </p>
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200 font-medium">
                  <th className="py-2.5 px-3">Product Vertical</th>
                  <th className="py-2.5 px-3">Advertising Elasticity (E_ad)</th>
                  <th className="py-2.5 px-3">Observed ROAS Multiple</th>
                  <th className="py-2.5 px-3">Recommended Spend Cap per FC Zone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono tabular-nums text-slate-700">
                {Object.entries(elasticities).map(([cat, e]) => (
                  <tr key={cat} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-900">{cat}</td>
                    <td className="py-2.5 px-3 font-bold text-emerald-700">+{e.adElasticity}</td>
                    <td className="py-2.5 px-3 font-bold text-teal-700">{e.roasMultiple}x</td>
                    <td className="py-2.5 px-3 text-slate-600">₹45L – ₹75L</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeAnalysisTab === 'price' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-slate-900">Price vs Sales Volume &amp; Price Elasticity of Demand</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Price elasticity of demand measures consumer responsiveness to price changes:
            <span className="block font-mono font-bold text-emerald-800 my-1 bg-emerald-50 p-2 rounded">
              E_p = (% Change in Quantity Demanded) / (% Change in Price)
            </span>
            Fashion and Beauty show elastic behavior (|E_p| &gt; 1.8), where even modest price drops produce massive volume spikes. Mobiles and Electronics, being higher-consideration purchases, require bundled financing (No Cost EMI) rather than purely blunt price cuts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xs font-bold text-rose-700 block mb-1">Highly Elastic Verticals:</span>
              <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                <li>Fashion &amp; Apparel (E_p = -2.35): Volume swings violently with flash sales.</li>
                <li>Beauty &amp; Personal Care (E_p = -1.88): BOGO (Buy 1 Get 1) offers trigger basket build.</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-xs font-bold text-teal-700 block mb-1">Inelastic / Semi-Elastic Verticals:</span>
              <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                <li>Sweets &amp; Gourmet (E_p = -0.85): Essential gifting purchase with inelastic holiday demand.</li>
                <li>Home &amp; Kitchen (E_p = -1.45): Steady appliance upgrades driven by festival traditions.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeAnalysisTab === 'rating' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-bold text-slate-900">Customer Rating &amp; Marketplace Trust Multipliers</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Analysis reveals that items with customer ratings &ge; 4.3★ convert at 2.6x the rate of items rated &lt; 4.0★ during high-traffic festival sales. When shoppers are making rapid buying decisions during limited-time lightning deals, social proof and reviews serve as a decisive risk mitigant.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
            <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg">
              <div className="flex items-center gap-1 text-emerald-800 font-bold mb-1">
                <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                <span>4.5★ – 5.0★ Tier</span>
              </div>
              <p className="text-slate-700">Conversion rate: 8.4%. Preferred for Amazon Choice / Lightning Deals hero banner.</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-1 text-slate-700 font-bold mb-1">
                <Star className="w-3.5 h-3.5 text-slate-500" />
                <span>4.0★ – 4.4★ Tier</span>
              </div>
              <p className="text-slate-700">Conversion rate: 5.1%. Standard search result placement with steady velocity.</p>
            </div>
            <div className="p-3 bg-rose-50/50 border border-rose-200 rounded-lg">
              <div className="flex items-center gap-1 text-rose-700 font-bold mb-1">
                <Star className="w-3.5 h-3.5 text-rose-500" />
                <span>&lt; 4.0★ Tier</span>
              </div>
              <p className="text-slate-700">Conversion rate: 2.2%. High return-to-origin (RTO) risk; do not allocate primary ad spend.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
